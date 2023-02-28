<template>
    <div class="flex space-x-20 flex-nowrap bg-gray-600  rounded-md p-2 shadow-xl w-[180px]">

        <ul class=" flex flex-col space-y-3 text-white">
            <li title="strength" :class="backStat"><img :class="imgClass" src="../../assets/strength.svg" />
                <div class="bg-red-200 h-5 rounded-xl w-max-[120px]" :style="{ width: str + 'px', maxWidth: 120 + 'px' }">
                </div><span>{{ str
                }}</span>
            </li>

            <li title="health points" :class="backStat"><img :class="imgClass" src="../../assets/hp.svg" />
                <div class="bg-red-600 h-5 rounded-xl w-max-[120px]" :style="{ width: life + 'px' }"></div><span>{{ life
                }}</span>
            </li>
            <li title="experience" :class="backStat"><img :class="imgClass" src="../../assets/exp.svg" />
                <div class="bg-orange-600 h-5 rounded-xl w-max-[120px]"
                    :style="{ width: exp + 'px', maxWidth: 120 + 'px' }"></div><span>{{ exp
                    }}</span>
            </li>
        </ul>
    </div>
</template>

<script >
import { ref, watch } from 'vue';
import { useGameStore } from '../../stores/game';
export default {


    setup() {
        const gameStore = useGameStore()
        const backStat = ref('flex items-center space-x-1')
        const imgClass = ref('h-6')
        const str = ref(gameStore.monsterStr)
        const exp = ref(gameStore.monsterExp)
        const life = ref(gameStore.monsterLife)
        const gameInProgress = ref(gameStore.gameInProgress)
        watch(gameStore, () => {
            life.value = gameStore.monsterLife
            str.value = gameStore.monsterStr
            exp.value = gameStore.monsterExp
        })
        return { backStat, imgClass, life, str, exp, gameInProgress }
    }

}

</script>

<style scoped></style>