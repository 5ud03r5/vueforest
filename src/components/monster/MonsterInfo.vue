<template>
    <div>
        <ul class="flex flex-col space-y-2 items-center">
            <img class="h-32" src="../../assets/game/ninja/ninja.svg" />
            <div class="flex space-x-2">
                <div class="text-white">Bandit
                </div>
                <div class="text-red-600">{{ monsterLevel }} lvl
                </div>
                <div v-if="!gameInProgress" @click="increaseLevel" title="increase lvl"
                    class=" hover:cursor-pointer hover:bg-gray-700 text-white bg-gray-500 rounded-md pl-2 pr-2">+</div>
            </div>

        </ul>
    </div>
</template>

<script>

import { ref, watch } from 'vue'
import { useGameStore } from '../../stores/game';
export default {

    setup() {
        const gameStore = useGameStore()
        const monsterLevel = ref(gameStore.monsterLevel)
        const gameInProgress = ref(gameStore.gameInProgress)
        const increaseLevel = () => {
            if (monsterLevel.value === 100) {
                return;
            }
            gameStore.monsterLevel++

            gameStore.monsterStr = gameStore.monsterStr + 2
            gameStore.monsterExp = gameStore.monsterExp + 3
            monsterLevel.value = gameStore.monsterLevel

        }
        watch(gameStore, () => {
            console.log('game in', gameStore.gameInProgress)
            gameInProgress.value = gameStore.gameInProgress
            monsterLevel.value = gameStore.monsterLevel

        })

        return { monsterLevel, increaseLevel, gameInProgress }

    }

}
</script>