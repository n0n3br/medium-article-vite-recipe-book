import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Ingredients from "./components/Ingredients.vue";
import Recipes from "./components/Recipes.vue";

const history = createWebHistory();

const routes = [
    { path: "/", component: Home },
    { path: "/ingredients", component: Ingredients },
    { path: "/recipes", component: Recipes },
];

const router = createRouter({ history, routes });

export default router;
