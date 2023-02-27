<template>
    <div class="">
        <img class="absolute h-44 top-[-175px]" :style="{ right: right + 'px' }" :src='monsterPic' />
        <div v-if="showHit" class="absolute z-[2000] text-red-800 text-[50px] font-black h-max w-max p-2   right-4"
            :style="{ top: -top + 'px', opacity: opacity }">
            -100
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useGameStore } from '@/stores/game';
export default {
    setup() {
        const charState = ref('idle')
        const counter = ref(1)
        const right = ref(20)
        const top = ref(250)
        const showHit = ref(false)
        const opacity = ref(1)
        const gameStore = useGameStore()
        const monsterPic = ref("/src/assets/game/ninja/" + charState.value + "_" + counter.value + ".png")
        let round = 0
        setInterval(() => {
            if (charState.value === "run") {

                round = round + 10
                right.value = round
                if (right.value > 930) {
                    counter.value = 1;
                    charState.value = 'attack'
                }
            }
            if (charState.value === "runback") {
                round = round - 10
                right.value = round
                if (right.value < 20) {
                    counter.value = 1;
                    charState.value = 'idle'
                    round = 0
                    right.value = 20
                    gameStore.turn = 'user'
                    gameStore.actionInProgress = false

                }
            }
            counter.value++;
            if (counter.value > 9) {
                if (charState.value === "attack") {
                    charState.value = "runback";
                }
                counter.value = 1;

            }
        }, 40);

        watch(counter, () => {
            monsterPic.value = "/src/assets/game/ninja/" + charState.value + "_" + counter.value + ".png"
        })
        watch(gameStore, () => {

            if (gameStore.turn === 'monster') {
                setAttack()
            }
            if (gameStore.monsterHit === true) {
                showHit.value = true
                const interval = setInterval(() => {
                    top.value = top.value + 10
                    opacity.value = opacity.value - 0.1
                    if (top.value === 350) {
                        showHit.value = false
                        gameStore.monsterHit = false
                        top.value = 250
                        opacity.value = 1
                        clearInterval(interval)
                    }
                }, 50)
            }
        })


        const setAttack = () => {

            charState.value = 'run'
            counter.value = 1

        }
        return { monsterPic, setAttack, right, showHit, top, opacity }
    }



}
</script>