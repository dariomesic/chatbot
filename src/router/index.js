import { createRouter, createWebHistory } from "vue-router";
const IntentList = () => import("../views/IntentList.vue");
const IntentRules  = () => import("../views/IntentRules.vue");

const routes = [
    {
        path: "/",
        component: IntentList,
    },
    { 
      path: '/intent/:name', 
      name: 'IntentRules', 
      component: IntentRules, 
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
    }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;