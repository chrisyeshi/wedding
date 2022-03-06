import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";

const messages = {
  en: {
    message: {
      wedding: "Wedding",
      invitation: "Invitation to follow",
      chris: "Chris",
      paula: "Paula",
    },
  },
  zh: {
    message: {
      wedding: "婚禮",
      invitation: "晚些發出正式邀請",
      chris: "葉鬱蔥",
      paula: "張寶方",
    },
  },
};

const i18n = createI18n({
  locale: "en",
  messages,
});

const app = createApp(App);

app.use(i18n);
app.use(router);

app.mount("#app");
