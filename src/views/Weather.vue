<template>
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <a-card
      class="weather-container"
      :title="$t('weatherPage.weather')"
      style="text-align: center">
      <div>
        <a-input
          v-model:value="cityName"
          placeholder="Enter city name"></a-input>
        <a-button
          type="primary"
          @click="fetchWeather"
          style="margin-top: 20px"
          >{{ $t("weatherPage.getWeather") }}</a-button
        >
        <div v-if="weatherData" style="margin-top: 30px">
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
import { ref } from "vue";
import axios from "axios";
import cityData from "@/assets/data/ir.json";
import { theme } from "ant-design-vue";
import { useStore } from "vuex";

const store = useStore();
const currentTheme = store.state.theme;

const cityName = ref("");
const cityDataList = cityData;
const weatherData = ref(null);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const findCityData = (cityName) => {
  return cityDataList.find(
    (city) => city.city === capitalizeFirstLetter(cityName)
  );
};

const fetchWeather = async () => {
  try {
    const cityInfo = findCityData(cityName.value);
    if (!cityInfo) {
      console.error("City not found in the JSON file.");
      return;
    }
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.lat}&longitude=${cityInfo.lng}&current_weather=true`
    );
    weatherData.value = response.data;
    console.log(weatherData.value);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
</script>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: auto;
}
</style>
