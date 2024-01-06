import { createRouter, createWebHistory } from "vue-router";
const HomePage = () => import("../views/HomePage.vue");
const IntentRules = () => import("../views/IntentRules.vue");
const Actions = () => import("../views/ActionsPage.vue");

const routes = [
  {
    path: "/",
    name: "HomePage",
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

router.beforeEach((to, from, next) => {
  if (
    (to.name =
      ("Actions" &&
        to.query.system_id !== sessionStorage.getItem("systemId")) ||
      (to.name === "Actions" && from.name === undefined))
  ) {
    sessionStorage.removeItem("currentPage");
    sessionStorage.removeItem("itemsPerPage");
    sessionStorage.removeItem("sortIcon");
    sessionStorage.removeItem("isVisible");
    sessionStorage.removeItem("currentPageCH");
    sessionStorage.removeItem("itemsPerPageCH");
    sessionStorage.removeItem("sortIconCH");
    sessionStorage.removeItem("isVisibleCH");
  }
  if (to.name === "HomePage" && from.name === undefined) {
    sessionStorage.removeItem("sortIconHP");
    sessionStorage.removeItem("isVisibleHP");
  }
  next();
});

export default router;
