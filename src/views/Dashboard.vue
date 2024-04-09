<template>
  <!-- Configuration provider for theme -->
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <!-- Flex container with centered content -->
    <a-flex
      :style="{ height: '60vh' }"
      align="center"
      justify="center"
      vertical>
      <!-- Display current time -->
      <a-typography-text id="current-time" :style="{ fontSize: '50px' }">{{
        currentTime
      }}</a-typography-text>
      <!-- Display greeting message -->
      <a-typography-title id="greeting-title">
        {{ greetingMessage }}
      </a-typography-title>
    </a-flex>
  </a-config-provider>
</template>

<script setup>
// Importing necessary Vue functions and libraries
import { ref, computed, onMounted, onUnmounted } from "vue";
import { theme } from "ant-design-vue";
import { useStore } from "vuex";
import i18next from "i18next";

// Accessing Vuex store
const store = useStore();
// Retrieving current theme from store
const currentTheme = store.state.theme;

// Initializing reactive variable for user name
const userName = ref("");
// Initializing reactive variable for current time
const currentTime = ref(
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
);

// Checking if user name is stored in local storage
if (localStorage.getItem("userName")) {
  // Retrieving user name from local storage
  userName.value = localStorage.getItem("userName");
} else {
  // Prompting user to enter name if not stored in local storage
  userName.value = prompt("Please enter your name:");
  // Storing entered user name in local storage
  localStorage.setItem("userName", userName.value);
}

// Function to update current time
function updateTime() {
  currentTime.value = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Computed property for generating greeting message based on time of day
const greetingMessage = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return `${i18next.t("greeting.goodMorning")}, ${userName.value}`;
  } else if (hour >= 12 && hour < 18) {
    return `${i18next.t("greeting.goodAfternoon")}, ${userName.value}`;
  } else {
    return `${i18next.t("greeting.goodEvening")}, ${userName.value}`;
  }
});

let intervalId;
// Lifecycle hook: called when component is mounted
onMounted(() => {
  // Setting up interval to update time every minute
  intervalId = setInterval(updateTime, 60000);
});

// Lifecycle hook: called when component is unmounted
onUnmounted(() => {
  // Clearing interval to stop updating time
  clearInterval(intervalId);
});
</script>

<!-- Scoped styling -->
<style scoped></style>
