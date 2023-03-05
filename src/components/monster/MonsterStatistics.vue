<template>
    <div class="flex space-x-20 flex-nowrap bg-gray-600  rounded-md p-2 shadow-xl w-[180px]">

        <ul class=" flex flex-col space-y-3 text-white">
            <li title="strength" :class="backStat"><img :class="imgClass" src="../../assets/strength.svg" />
                <div class="bg-red-200 h-5 rounded-xl w-max-[120px]"
                    :style="{ width: monsterStr + 'px', maxWidth: 120 + 'px' }">
                </div><span>{{ monsterStr
                }}</span>
            </li>

            <li title="health points" :class="backStat"><img :class="imgClass" src="../../assets/hp.svg" />
                <div class="bg-red-600 h-5 rounded-xl w-max-[120px]" :style="{ width: monsterLife + 'px' }"></div><span>{{
                    monsterLife
                }}</span>
            </li>
            <li title="experience" :class="backStat"><img :class="imgClass" src="../../assets/exp.svg" />
                <div class="bg-orange-600 h-5 rounded-xl w-max-[120px]"
                    :style="{ width: monsterExp + 'px', maxWidth: 120 + 'px' }"></div><span>{{ monsterExp
                    }}</span>
            </li>
        </ul>
    </div>
</template>

<script >
import { ref, watch } from 'vue';
import { useGameStore } from '../../stores/game';
import { storeToRefs } from 'pinia';
export default {


    setup() {
        const gameStore = useGameStore()
        const backStat = ref('flex items-center space-x-1')
        const imgClass = ref('h-6')

        const { monsterStr, monsterExp, monsterLife, gameInProgress } = storeToRefs(gameStore)

        watch(monsterLife, () => {
            if (monsterLife.value <= 0) {
                monsterLife.value = 0
            }

        })
        return { backStat, imgClass, monsterLife, monsterStr, monsterExp, gameInProgress }
    }

}

</script>

<style scoped></style>