describe("Weather Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/weather");
  });

  it("Allows fetching weather data for a valid city", () => {
    const cityName = "Tehran";

    // Type the city name in the input field
    cy.get("#weather-input").type(cityName);

    // Click the button to fetch weather
    cy.get("#weather-btn").click();

    // Wait for the weather data to load
    cy.get("#weatherInfo-container").contains("h2", cityName).should("exist");
  });

  it("Displays temperature and wind speed after fetching weather data", () => {
    const cityName = "Tehran";

    // Type the city name in the input field
    cy.get("#weather-input").type(cityName);

    // Click the button to fetch weather
    cy.get("#weather-btn").click();

    // Wait for the weather data to load
    cy.get("#weatherInfo-container").contains("h2", cityName).should("exist");

    // Check if temperature and wind speed are displayed
    cy.get("#weatherInfo-container")
      .contains("p", "Temperature:")
      .should("exist");
    cy.get("#weatherInfo-container")
      .contains("p", "Wind Speed:")
      .should("exist");
  });
});
