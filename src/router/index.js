import { createRouter, createWebHistory } from "vue-router";
import ArenaPage from "../pages/ArenaPage.vue";
import RegistrationPage from "../pages/RegistrationPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { useUserStore } from "../stores/user";
import { auth } from "../includes/firebase";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
      meta: { requiresAuth: false },
    },
    {
      path: "/arena",
      component: ArenaPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      component: RegistrationPage,
    },
    { path: "/login", component: LoginPage },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

router.beforeEach((to, from) => {
  const store = useUserStore();
  if (to.meta.requiresAuth && !store.userLoggedIn) {
    if (auth.currentUser) {
      store.userLoggedIn = true;
      return to.fullPath;
    }
    return "/login";
  }
});

export default router;
