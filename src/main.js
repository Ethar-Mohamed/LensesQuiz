import "./assets/main.css";
import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { en, ar },
});

const app = createApp(App);
app.use(router);
app.use(i18n);

app.mixin({
  mounted() {
    document.dir = this.$i18n.locale === "ar" ? "rtl" : "ltr";
  },
  watch: {
    "$i18n.locale"(newLang) {
      document.dir = newLang === "ar" ? "rtl" : "ltr";
    },
  },
});

app.mount("#app");
