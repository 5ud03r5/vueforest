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
  const monsterStr = ref(7);
  const hit = ref(0);
  const userStrFromItems = ref(0);
  const userArmorFromItems = ref(0);
  const userMpowerFromItems = ref(0);
  const monsterLevel = ref(1);
  const monsterExp = ref(20);
  const gameInProgress = ref(false);

  const resetValues = () => {
    turn.value = "user";
    monsterHit.value = false;
    playerHit.value = false;
    monsterLife.value = 100;
    userLife.value = 100;
    actionInProgress.value = false;
    monsterLevel.value = 1;
    monsterExp.value = 20;
    monsterStr.value = 5;
    gameInProgress.value = false;
  };

  return {
    turn,
    userMpowerFromItems,
    userArmorFromItems,
    monsterExp,
    userStrFromItems,
    actionInProgress,
    monsterHit,
    monsterLevel,
    monsterStr,
    playerHit,
    monsterData,
    gameInProgress,
    monsterLife,
    hit,
    userLife,
    resetValues,
  };
});
