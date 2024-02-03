import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { devPlugin, getReplacer } from "./plugins/devPlugins";
import optimizer from "vite-plugin-optimizer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [optimizer(getReplacer()), devPlugin(), vue()],
  // server: {
  //   host: true,
  //   port: 3000,
  // },
});
