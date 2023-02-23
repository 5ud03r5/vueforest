import { createRouter, createWebHistory } from "vue-router";
import CharacterPage from "../pages/CharacterPage.vue";
import VillagePage from "../pages/VillagePage.vue";
import ForestPage from "../pages/ForestPage.vue";
import CraftingPage from "../pages/CraftingPage.vue";
import TrainingPage from "../pages/TrainingPage.vue";
import SocialPage from "../pages/SocialPage.vue";
import RegistrationPage from "../pages/RegistrationPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/mycharacter",
      component: CharacterPage,
      meta: { requiresAuth: true },
    },
    { path: "/village", component: VillagePage, meta: { requiresAuth: true } },
    { path: "/forest", component: ForestPage, meta: { requiresAuth: true } },
    {
      path: "/crafting",
      component: CraftingPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/training",
      component: TrainingPage,
      meta: { requiresAuth: true },
    },
    { path: "/social", component: SocialPage, meta: { requiresAuth: true } },
    {
      path: "/register",
      component: RegistrationPage,
      meta: { requiresAuth: false },
    },
    { path: "/login", component: LoginPage, meta: { requiresAuth: false } },
  ],
});

router.beforeEach((to) => {
  const store = useUserStore();
  if (to.meta.requiresAuth && !store.userLoggedIn) {
    return "/login";
  } else if (!to.meta.requiresAuth && store.userLoggedIn) {
    return "/mycharacter";
  }
});

export default router;
