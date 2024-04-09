import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Todos from "../views/Todos.vue";
import Weather from "../views/Weather.vue";
import Profile from "../views/Profile.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/todos", name: "todos", component: Todos },
  { path: "/weather", name: "weather", component: Weather },
  { path: "/profile", name: "profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
