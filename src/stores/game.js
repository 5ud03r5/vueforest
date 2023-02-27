import { ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const turn = ref("user");
  const actionInProgress = ref(true);
  const monsterHit = ref(false);
  const playerHit = ref(false);
  return { turn, actionInProgress, monsterHit, playerHit };
});
