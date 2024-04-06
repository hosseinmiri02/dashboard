<template>
  <a-flex :style="{ height: '60vh' }" align="center" justify="center" vertical>
    <a-typography-text :style="{ fontSize: '50px' }">{{
      currentTime
    }}</a-typography-text>
    <a-typography-title>
      {{ greetingMessage }}
    </a-typography-title>
  </a-flex>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

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
    return `Good Morning, ${userName.value}`;
  } else if (hour >= 12 && hour < 18) {
    return `Good Afternoon, ${userName.value}`;
  } else {
    return `Good Evening, ${userName.value}`;
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
