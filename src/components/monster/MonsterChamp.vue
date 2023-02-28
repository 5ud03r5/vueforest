<template>
    <div class="">
        <img class="absolute h-44" :style="{ right: right + 'px', top: -topMonst + 'px' }" :src='monsterPic' />

        <div v-if="showHit" class="absolute text-red-800 text-[50px] font-black h-max w-max  right-4 "
            :style="{ top: -top + 'px', opacity: opacity }">
            -{{ hit }}
        </div>


    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useGameStore } from '@/stores/game';
import { useUserStore } from '../../stores/user';
import { onBeforeRouteLeave } from 'vue-router';
export default {
    setup() {
        const userStore = useUserStore()
        const charState = ref('idle')
        const counter = ref(1)
        const right = ref(20)
        const top = ref(250)
        const attacking = ref(false)
        const topMonst = ref(175)
        const showHit = ref(false)
        const opacity = ref(1)
        const gameStore = useGameStore()
        const hit = ref(0)

        const monsterPic = ref("/src/assets/game/ninja/" + charState.value + "_" + counter.value + ".png")
        onBeforeRouteLeave(() => { clearInterval(intervalMain), console.log('here') })


        let round = 0
        const intervalMain = setInterval(() => {

            if (charState.value === "run") {

                round = round + 10
                right.value = round
                if (right.value > 930) {
                    counter.value = 1;
                    topMonst.value = 160
                    charState.value = 'attack'

                }
            }
            if (charState.value === "runback") {
                round = round - 10
                right.value = round
                if (right.value < 20) {
                    counter.value = 1;

                    round = 0
                    right.value = 20
                    gameStore.turn = 'user'
                    charState.value = 'idle'
                    topMonst.value = 175
                    gameStore.actionInProgress = false

                }
            }
            counter.value++;
            if (counter.value > 9) {
                if (charState.value === "attack") {
                    gameStore.playerHit = true
                    topMonst.value = 168
                    charState.value = "runback";

                }
                counter.value = 1;

            }
        }, 40);

        watch(counter, () => {
            monsterPic.value = "/src/assets/game/ninja/" + charState.value + "_" + counter.value + ".png"
        })
        watch(gameStore, () => {

            if (gameStore.turn === 'monster' && charState.value === 'idle') {
                console.log(gameStore.turn)
                setAttack()
            }
            if (gameStore.monsterHit === true && attacking.value === false) {
                attacking.value = true
                hit.value = (Math.floor(Math.random() * ((userStore.user.str + gameStore.userStrFromItems) - 2) + 2))
                gameStore.monsterLife = gameStore.monsterLife - hit.value
                showHit.value = true

                const interval = setInterval(() => {
                    top.value = top.value + 10
                    opacity.value = opacity.value - 0.1
                    if (top.value === 350) {
                        showHit.value = false
                        gameStore.monsterHit = false
                        attacking.value = false
                        top.value = 250
                        opacity.value = 1
                        clearInterval(interval)
                    }
                }, 50)
            }
        })


        const setAttack = () => {
            topMonst.value = 168
            charState.value = 'run'
            counter.value = 1
        }

        return { monsterPic, setAttack, right, showHit, top, opacity, topMonst, hit }
    }



}
</script>