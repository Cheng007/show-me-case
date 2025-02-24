import { createRouter, createWebHashHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export { routes };
export default router;
