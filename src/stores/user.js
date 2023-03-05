import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const userLoggedIn = ref(false);

  const setUserLoggedIn = () => {
    userLoggedIn.value = true;
  };

  return { userLoggedIn, setUserLoggedIn, user };
});
