import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { registerIcons } from "./plugins/icons";

const app = createApp(App);

registerIcons(app);

app.mount("#app");
