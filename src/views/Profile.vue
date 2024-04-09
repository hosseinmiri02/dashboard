<template>
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <a-card
      class="container"
      :title="$t('profilePage.settings')"
      style="text-align: center">
      <a-flex vertical align="center">
        <a-input id="profile-nameInput" v-model:value="newUserName" />

        <a-select
          id="profile-themeInput"
          style="width: 120px"
          @change="handleThemeChange"
          :value="currentTheme"
          :style="{ marginTop: '20px' }">
          <a-select-option id="profile-lightTheme" value="light">{{
            $t("profilePage.light")
          }}</a-select-option>
          <a-select-option id="profile-darkTheme" value="dark">{{
            $t("profilePage.dark")
          }}</a-select-option>
        </a-select>

        <a-select
          id="profile-langInput"
          style="width: 120px"
          @change="handleLanguageChange"
          :value="currentLanguage"
          :style="{ marginTop: '20px' }">
          <a-select-option
            id="profile-langItem"
            v-for="lng in Object.keys(languages)"
            :key="lng"
            :value="languages[lng].nativeName"
            v-on:click="$i18next.changeLanguage(lng)">
            {{ languages[lng].nativeName }}
          </a-select-option>
        </a-select>

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
import { ref } from "vue";
import { theme } from "ant-design-vue";

const currentUserName = localStorage.getItem("userName") || "";
const newUserName = ref(currentUserName);

const currentTheme = ref(localStorage.getItem("theme") || "light");
const currentLanguage = ref(localStorage.getItem("language") || "persian");

const languages = ref({
  en: { nativeName: "English" },
  fr: { nativeName: "فارسی" },
});

function handleThemeChange(value) {
  currentTheme.value = value;
}

function handleLanguageChange(value) {
  currentLanguage.value = value;
}

function saveChanges() {
  if (newUserName.value.trim() !== "") {
    localStorage.setItem("userName", newUserName.value.trim());
  }

  localStorage.setItem("theme", currentTheme.value);

  localStorage.setItem("language", currentLanguage.value);

  location.reload();
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
}
</style>
