import { createRouter, createWebHistory } from "vue-router";
const IntentList = () => import("../views/IntentList.vue");
const IntentRules  = () => import("../views/IntentRules.vue");

const routes = [
    {
        path: "/",
        component: IntentList,
    },
    { 
      path: '/intent/:id', 
      name: 'IntentRules', 
      component: IntentRules, 
      props: true 
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