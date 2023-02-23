import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userLoggedIn = ref(false);
  const setUserLoggedIn = () => {
    userLoggedIn.value = true;
  };

  return { userLoggedIn, setUserLoggedIn };
});
