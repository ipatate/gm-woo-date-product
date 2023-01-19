import { createApp } from "vue";
import { createPinia } from "pinia";
import panel from "./panel/main.vue";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("gm-date-app");
  if (container) {
    const pinia = createPinia();
    const app = createApp(panel, {});
    app.use(pinia);
    app.mount("#gm-date-app");
  }
});
