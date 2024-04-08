import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          nav: {
            dashboard: "Dashboard",
            todos: "TODOS",
            weather: "Weather",
            profile: "Profile",
          },
          greeting: {
            goodMorning: "Good Morning",
            goodAfternoon: "Good Afternoon",
            goodEvening: "Good Evening",
          },
          todosPage: {
            todoList: "TODO List",
          },
          weatherPage: {
            weather: "Weather",
            getWeather: "Get Weather",
          },
          profilePage: {
            settings: "Settings",
            save: "Save",
            light: "Light",
            dark: "Dark",
          },
        },
      },
      fr: {
        translation: {
          nav: {
            dashboard: "داشبورد",
            todos: "کار ها",
            weather: "آب و هوا",
            profile: "مشخصات",
          },
          greeting: {
            goodMorning: "صبح بخیر",
            goodAfternoon: "ظهر بخیر",
            goodEvening: "شب بخیر",
          },
          todosPage: {
            todoList: "لیست کار ها",
          },
          weatherPage: {
            weather: "آب و هوا",
            getWeather: "دریافت آب و هوا",
          },
          profilePage: {
            settings: "تنظیمات",
            save: "ذخیره کردن",
            light: "روشن",
            dark: "تاریک",
          },
        },
      },
    },
  });

export default function (app) {
  app.use(I18NextVue, { i18next });
  return app;
}
