import { createApp } from "vue";
import App from "./App.vue";
import VueLazyLoad from 'vue3-lazyload'
import VueEasyLightbox from 'vue-easy-lightbox'
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(VueLazyLoad);
app.use(VueEasyLightbox);

app.mount("#app");
