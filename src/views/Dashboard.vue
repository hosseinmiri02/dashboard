<template>
  <a-config-provider
    :theme="{
      algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : null,
    }">
    <a-flex
      :style="{ height: '60vh' }"
      align="center"
      justify="center"
      vertical>
      <a-typography-text id="current-time" :style="{ fontSize: '50px' }">{{
        currentTime
      }}</a-typography-text>
      <a-typography-title id="greeting-title">
        {{ greetingMessage }}
      </a-typography-title>
    </a-flex>
  </a-config-provider>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { theme } from "ant-design-vue";
import { useStore } from "vuex";
import i18next from "i18next";

const store = useStore();
const currentTheme = store.state.theme;

const userName = ref("");
const currentTime = ref(
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
);

if (localStorage.getItem("userName")) {
  userName.value = localStorage.getItem("userName");
} else {
  userName.value = prompt("Please enter your name:");
  localStorage.setItem("userName", userName.value);
}

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const greetingMessage = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return i18next.t("greeting.goodMorning", { userName: userName.value });
  } else if (hour >= 12 && hour < 18) {
    return i18next.t("greeting.goodAfternoon", { userName: userName.value });
  } else {
    return i18next.t("greeting.goodEvening", { userName: userName.value });
  }
});

let intervalId;
onMounted(() => {
  intervalId = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped></style>
