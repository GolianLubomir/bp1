import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MathReactions from "../views/MathReactions.vue";
import NumberMemory from "../views/NumberMemory.vue";
import MathMemory from "../views/MathMemory.vue";
import FindTheSame from "../views/FindTheSame.vue";
import Graphs from "../views/Graphs.vue";
import NumberSystems from "../views/NumberSystems.vue";
import Surveys from "../views/Surveys.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Training from "../components/Training.vue";
import Description from "../components/Description.vue";
import StatsChart from "../components/StatsChart.vue";
import store from "../store/";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "DefaultLayout",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/home", name: "Home", component: Home },
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      {
        path: "/training",
        redirect: "/training/mathreactions",
        name: "Training",
        component: Training,
        children: [
          {
            path: "/training/mathreactions",
            name: "MathReactions",
            components: { 
                default: MathReactions,
                stats: StatsChart,
                description: Description,
            } 
          },
          {
            path: "/training/numbermemory",
            name: "NumberMemory",
            components: { 
              default: NumberMemory,
              stats: StatsChart,
              description: Description,
            } 
          },
          {
            path: "/training/mathmemory",
            name: "MathMemory",
            components: { 
              default: MathMemory,
              stats: StatsChart,
              description: Description,
            } 
          },
          {
            path: "/training/findthesame",
            name: "FindTheSame",
            components: { 
              default: FindTheSame,
              stats: StatsChart,
              description: Description,
            } 
          },
          {
            path: "/training/graphs",
            name: "Graphs",
            components: { 
              default: Graphs,
              stats: StatsChart,
              description: Description,
            } 
          },
          {
            path: "/training/numbersystems",
            name: "NumberSystems",
            components: { 
              default: NumberSystems,
              stats: StatsChart,
              description: Description,
            } 
          },
          
        ],
      },
      /*{path: '/surveys', name: 'Surveys', component: Surveys}*/
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
