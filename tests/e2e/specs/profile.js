describe("Profile Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/profile");
  });

  it("Allows a user to change their username", () => {
    const newUserName = "NewUserName";
    cy.get("#profile-nameInput").clear().type(newUserName);
    cy.get("button").contains("Save").click();
    cy.reload();
    cy.get("#profile-nameInput").should("have.value", newUserName);
  });
});
