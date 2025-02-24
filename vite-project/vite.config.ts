import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VantResolver } from "@vant/auto-import-resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({ exclude: "**/components" }),
    vue(),
    AutoImport({ dts: true, resolvers: [VantResolver()] }),
    Components({ dts: true, resolvers: [VantResolver()] }),
  ],
});
