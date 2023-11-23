import { createRouter, createWebHistory } from "vue-router";
const HomePage = () => import("../views/HomePage.vue");
const IntentRules = () => import("../views/IntentRules.vue");
const Actions = () => import("../views/ActionsPage.vue");

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/actions/intent",
    name: "IntentRules",
    component: IntentRules,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
  },
  {
    path: "/actions",
    name: "Actions",
    component: Actions,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
