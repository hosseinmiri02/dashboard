import { createStore } from "vuex";

export default createStore({
  state: {
    theme: localStorage.getItem("theme") || "light",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
