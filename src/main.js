import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";
import App from "./App.vue";
import router from "./router";
import { auth } from "./includes/firebase";
import "./assets/base.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VueQueryPlugin);
    router.isReady().then(() => {
      app.mount("#app");
    });
  }
});
