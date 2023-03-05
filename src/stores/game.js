import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useUpdateMp, useUpdateStr, useUpdateExp } from "../hooks/query";
import { useUserStore } from "./user";
import { useQueryClient, useMutation } from "vue-query";

export const useGameStore = defineStore("game", () => {
  const turn = ref("user");
  const actionInProgress = ref(false);
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
  const monsterExp = ref(120);
  const gameInProgress = ref(false);
  const playerStr = ref(0);
  const playerMpower = ref(0);
  const userStore = useUserStore();
  const playerLevel = ref(1);
  const playerExp = ref(0);
  const gameover = ref(false);
  const unspentPoints = ref(0);
  const playerNextLevel = ref(playerLevel.value * 140 * 2);

  const mutation = useMutation(useUpdateMp, {
    onSuccess: () => {
      // Invalidate and refetch
    },
  });
  const mutationStr = useMutation(useUpdateStr, {
    onSuccess: () => {
      // Invalidate and refetch
    },
  });
  const mutationExp = useMutation(useUpdateExp, {
    onSuccess: () => {
      // Invalidate and refetch
    },
  });

  watch([playerStr, playerMpower], () => {
    if (playerMpower.value > 0) {
      mutation.mutate([
        playerMpower.value + userStore.user.mpower,
        unspentPoints.value,
      ]);
    }
    if (playerStr.value > 0) {
      mutationStr.mutate([
        playerStr.value + userStore.user.str,
        unspentPoints.value,
      ]);
    }
  });

  watch(playerExp, () => {
    if (playerExp.value >= playerNextLevel.value) {
      console.log("next level", playerNextLevel.value);
      playerLevel.value++;
      playerNextLevel.value = playerLevel.value * 140 * 2;
      unspentPoints.value = unspentPoints.value + 5;
    }

    mutationExp.mutate([
      playerExp.value,
      playerLevel.value,
      unspentPoints.value,
    ]);
  });

  watch([userLife, monsterLife], () => {
    if (userLife.value <= 0) {
      gameover.value = true;
    }
    if (monsterLife.value <= 0) {
      gameover.value = true;
      playerExp.value = monsterExp.value + playerExp.value;
    }
  });

  const resetValues = () => {
    turn.value = "user";
    monsterHit.value = false;
    playerHit.value = false;
    monsterLife.value = 100;
    userLife.value = 100;
    actionInProgress.value = false;
    monsterLevel.value = 1;
    monsterExp.value = 120;
    monsterStr.value = 7;
    gameInProgress.value = false;
    playerStr.value = 0;
    playerMpower.value = 0;
    gameover.value = false;
    userMpowerFromItems.value = 0;
    userArmorFromItems.value = 0;
    userStrFromItems.value = 0;
    playerNextLevel.value = playerLevel.value * 140 * 2;
  };

  const resetOnCloseModalValues = () => {
    turn.value = "user";
    monsterHit.value = false;
    playerHit.value = false;
    monsterLife.value = 100;
    userLife.value = 100;
    actionInProgress.value = false;
    monsterLevel.value = 1;
    monsterExp.value = 120;
    monsterStr.value = 7;
    gameInProgress.value = false;
    //playerStr.value = 0;
    //playerMpower.value = 0;
    gameover.value = false;
    playerNextLevel.value = playerLevel.value * 140 * 2;
  };

  return {
    turn,
    gameover,
    playerNextLevel,
    userMpowerFromItems,
    userArmorFromItems,
    monsterExp,
    userStrFromItems,
    playerExp,
    playerLevel,
    actionInProgress,
    monsterHit,
    playerMpower,
    playerStr,
    unspentPoints,
    monsterLevel,
    monsterStr,
    playerHit,
    monsterData,
    gameInProgress,
    monsterLife,
    hit,
    userLife,
    resetValues,
    resetOnCloseModalValues,
  };
});
