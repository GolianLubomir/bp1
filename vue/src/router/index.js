import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ReactionTime from "../views/ReactionTime.vue";
import NumberMemory from "../views/NumberMemory.vue";
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
        redirect: "/training/reactiontime",
        name: "Training",
        component: Training,
        children: [
          {
            path: "/training/reactiontime",
            name: "ReactionTime",
            components: { 
                default: ReactionTime,
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
