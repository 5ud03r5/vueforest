<template>
    <div>
        <ul class="flex flex-col space-y-2 items-center">
            <img class="h-32" src="../../assets/game/knight/Head.png" />
            <li class="text-white">{{ data.nickname }} <span class="text-cyan-300">{{ playerLevel }} lvl</span>
            </li>
            <li class="text-white">{{ playerExp }}/{{ playerNextLevel }} exp</li>
        </ul>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useGameStore } from '../../stores/game'
import { storeToRefs } from 'pinia'
export default {
    props: ['data'],
    setup(props) {
        const gameStore = useGameStore()
        const userStore = useUserStore()
        const data = ref(props.data)
        const { playerLevel, playerExp, playerNextLevel } = storeToRefs(gameStore)
        playerLevel.value = data.value.level
        userStore.user = data.value
        playerExp.value = data.value.exp
        playerNextLevel.value = data.value.level * 140 * 2

        return { data, playerLevel, playerExp, playerNextLevel }
    }
}
</script>