<template>
  <!-- Configuration provider for theme -->
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <!-- Card container for weather information -->
    <a-card
      class="weather-container"
      :title="$t('weatherPage.weather')"
      style="text-align: center">
      <div>
        <!-- Input field for entering city name -->
        <a-input
          id="weather-input"
          v-model:value="cityName"
          placeholder="Enter city name"></a-input>
        <!-- Button to fetch weather data -->
        <a-button
          id="weather-btn"
          type="primary"
          @click="fetchWeather"
          style="margin-top: 20px"
          >{{ $t("weatherPage.getWeather") }}</a-button
        >
        <!-- Container for displaying weather information -->
        <div
          id="weatherInfo-container"
          v-if="weatherData"
          style="margin-top: 30px">
          <h2>{{ capitalizeFirstLetter(cityName) }}</h2>
          <p>
            Temperature: {{ weatherData.current_weather.temperature || "" }}°C
          </p>
          <p>
            Wind Speed: {{ weatherData.current_weather.windspeed || "" }}km/h
          </p>
        </div>
      </div>
    </a-card>
  </a-config-provider>
</template>

<script setup>
// Importing necessary Vue functions and libraries
import { ref } from "vue";
import axios from "axios";
import cityData from "@/assets/data/ir.json";
import { theme } from "ant-design-vue";
import { useStore } from "vuex";

// Accessing Vuex store
const store = useStore();
// Retrieving current theme from store
const currentTheme = store.state.theme;

// Reactive variable for city name input
const cityName = ref("");
// List of city data
const cityDataList = cityData;
// Reactive variable for weather data
const weatherData = ref(null);

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to find city data based on city name
const findCityData = (cityName) => {
  return cityDataList.find(
    (city) => city.city === capitalizeFirstLetter(cityName)
  );
};

// Function to fetch weather data
const fetchWeather = async () => {
  try {
    // Find city data based on input city name
    const cityInfo = findCityData(cityName.value);
    // If city data is not found, show error message
    if (!cityInfo) {
      console.error("City not found in the JSON file.");
      alert("Invalid city name! Please enter a valid city name.");
      return;
    }
    // Fetch weather data from API
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.lat}&longitude=${cityInfo.lng}&current_weather=true`
    );
    // Update weather data with fetched data
    weatherData.value = response.data;
    console.log(weatherData.value);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Alert the user about error in fetching weather data
    alert("Error fetching weather data. Please try again later.");
  }
};
</script>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: auto;
}
</style>
