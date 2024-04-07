<template>
  <a-card class="weather-container" title="Weather" style="text-align: center">
    <div>
      <a-input v-model:value="cityName" placeholder="Enter city name"></a-input>
      <a-button type="primary" @click="fetchWeather" style="margin-top: 20px"
        >Get Weather</a-button
      >
      <div v-if="weatherData" style="margin-top: 30px">
        <h2>{{ capitalizeFirstLetter(cityName) }}</h2>
        <p>
          Temperature: {{ weatherData.current_weather.temperature || "" }}°C
        </p>
        <p>Wind Speed: {{ weatherData.current_weather.windspeed || "" }}km/h</p>
      </div>
    </div>
  </a-card>
</template>

<script>
import axios from "axios";
import cityData from "@/assets/data/ir.json";

export default {
  data() {
    return {
      cityName: "",
      cityData: cityData,
      weatherData: null,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    findCityData(cityName) {
      return this.cityData.find(
        (city) => city.city === this.capitalizeFirstLetter(cityName)
      );
    },
    async fetchWeather() {
      try {
        const cityInfo = this.findCityData(this.cityName);
        if (!cityInfo) {
          console.error("City not found in the JSON file.");
          return;
        }
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.lat}&longitude=${cityInfo.lng}&current_weather=true`
        );
        this.weatherData = response.data;
        console.log(this.weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
  },
};
</script>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: auto;
}
</style>
