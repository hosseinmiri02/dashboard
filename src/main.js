import { createApp } from "vue";
import Antd from "ant-design-vue";
import i18n from "./i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/reset.css";

i18n(createApp(App)).use(Antd).use(store).use(router).mount("#app");
