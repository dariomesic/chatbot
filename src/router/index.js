import { createRouter, createWebHistory } from "vue-router";
const HomePage = () => import("../views/HomePage.vue");
const IntentList = () => import("../views/IntentList.vue");
const IntentRules  = () => import("../views/IntentRules.vue");

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        name: 'Intents',
        path: "/intents",
        component: IntentList,
    },
    { 
      path: '/intents/intent', 
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