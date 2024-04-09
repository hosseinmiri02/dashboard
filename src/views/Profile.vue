<template>
  <!-- Configuration provider for theme -->
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <!-- Card container with user profile settings -->
    <a-card
      class="container"
      :title="$t('profilePage.settings')"
      style="text-align: center">
      <!-- Flex container for aligning elements vertically -->
      <a-flex vertical align="center">
        <!-- Input field for changing user name -->
        <a-input id="profile-nameInput" v-model:value="newUserName" />

        <!-- Dropdown for selecting theme -->
        <a-select
          id="profile-themeInput"
          style="width: 120px"
          @change="handleThemeChange"
          :value="currentTheme"
          :style="{ marginTop: '20px' }">
          <!-- Option for light theme -->
          <a-select-option id="profile-lightTheme" value="light">{{
            $t("profilePage.light")
          }}</a-select-option>
          <!-- Option for dark theme -->
          <a-select-option id="profile-darkTheme" value="dark">{{
            $t("profilePage.dark")
          }}</a-select-option>
        </a-select>

        <!-- Dropdown for selecting language -->
        <a-select
          id="profile-langInput"
          style="width: 120px"
          @change="handleLanguageChange"
          :value="currentLanguage"
          :style="{ marginTop: '20px' }">
          <!-- Option for each language -->
          <a-select-option
            id="profile-langItem"
            v-for="lng in Object.keys(languages)"
            :key="lng"
            :value="languages[lng].nativeName"
            v-on:click="$i18next.changeLanguage(lng)">
            {{ languages[lng].nativeName }}
          </a-select-option>
        </a-select>

        <!-- Button to save changes -->
        <a-button
          id="profile-btn"
          type="primary"
          @click="saveChanges"
          :style="{ marginTop: '20px' }"
          >{{ $t("profilePage.save") }}</a-button
        >
      </a-flex>
    </a-card>
  </a-config-provider>
</template>

<script setup>
// Importing necessary Vue functions and libraries
import { ref } from "vue";
import { theme } from "ant-design-vue";

// Retrieving current user name from local storage or empty string
const currentUserName = localStorage.getItem("userName") || "";
// Reactive variable for new user name
const newUserName = ref(currentUserName);

// Reactive variable for current theme, retrieved from local storage or defaulting to "light"
const currentTheme = ref(localStorage.getItem("theme") || "light");
// Reactive variable for current language, retrieved from local storage or defaulting to "persian"
const currentLanguage = ref(localStorage.getItem("language") || "persian");

// Reactive variable for languages
const languages = ref({
  en: { nativeName: "English" },
  fr: { nativeName: "فارسی" },
});

// Function to handle theme change
function handleThemeChange(value) {
  currentTheme.value = value;
}

// Function to handle language change
function handleLanguageChange(value) {
  currentLanguage.value = value;
}

// Function to save changes
function saveChanges() {
  // If new user name is not empty, store it in local storage
  if (newUserName.value.trim() !== "") {
    localStorage.setItem("userName", newUserName.value.trim());
  }

  // Store current theme in local storage
  localStorage.setItem("theme", currentTheme.value);

  // Store current language in local storage
  localStorage.setItem("language", currentLanguage.value);

  // Reload the page to apply changes
  location.reload();
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
}
</style>
