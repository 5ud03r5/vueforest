import { ref } from "vue";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const turn = ref("user");
  const actionInProgress = ref(true);
  const monsterHit = ref(false);
  const playerHit = ref(false);
  const monsterData = ref(null);
  const monsterLife = ref(100);
  const userLife = ref(100);
  const userStr = ref(0);
  const hit = ref(0);
  const userStrFromItems = ref(0);
  const userArmorFromItems = ref(0);
  const userMpowerFromItems = ref(0);
  const resetValues = () => {
    turn.value = "user";
    monsterHit.value = false;
    playerHit.value = false;
    monsterLife.value = 100;
    userLife.value = 100;
    actionInProgress.value = false;
  };

  return {
    turn,
    userMpowerFromItems,
    userArmorFromItems,
    userStrFromItems,
    actionInProgress,
    monsterHit,
    playerHit,
    monsterData,
    monsterLife,
    hit,
    userLife,
    resetValues,
  };
});
