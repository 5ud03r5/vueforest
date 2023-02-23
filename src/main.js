import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./includes/firebase";
import "./assets/base.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
