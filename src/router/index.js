import { createRouter, createWebHistory } from "vue-router";
import CharacterPage from "../pages/CharacterPage.vue";
import VillagePage from "../pages/VillagePage.vue";
import ForestPage from "../pages/ForestPage.vue";
import CraftingPage from "../pages/CraftingPage.vue";
import TrainingPage from "../pages/TrainingPage.vue";
import SocialPage from "../pages/SocialPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/mycharacter", component: CharacterPage },
    { path: "/village", component: VillagePage },
    { path: "/forest", component: ForestPage },
    { path: "/crafting", component: CraftingPage },
    { path: "/training", component: TrainingPage },
    { path: "/social", component: SocialPage },
  ],
});

export default router;
