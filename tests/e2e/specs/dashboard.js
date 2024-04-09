describe("Dashboard Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/"); // Replace '/dashboard' with the actual URL of your dashboard page
  });

  it("Displays current time and greeting message", () => {
    // Check if the current time is displayed
    cy.get("#current-time").should(
      "contain",
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    // Check if the greeting message is displayed
    cy.get("#greeting-title").should("exist").and("be.visible");
  });

  it("Prompts for username if not stored in local storage", () => {
    // Check if the prompt for username is displayed
    cy.window().then((window) => {
      if (!window.localStorage.getItem("userName")) {
        cy.on("window:confirm", () => "Test User");
        cy.reload();
        cy.get("#greeting-title").should("contain", "Good Morning, Test User");
      }
    });
  });

  it("Updates time every minute", () => {
    // Get initial time
    let initialTime;
    cy.get("#current-time")
      .invoke("text")
      .then((text) => {
        initialTime = text;
      });

    // Wait for 1 minute and check if the time updates
    cy.wait(60000);
    cy.get("#current-time").invoke("text").should("not.eq", initialTime);
  });
});
