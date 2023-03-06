<template>
    <div class="">
        <img class="absolute h-44" :style="{ right: right + 'px', top: -topMonst + 'px' }"
            :src='getImageUrl(charState, counter)' />

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
import { storeToRefs } from 'pinia';
export default {
    setup() {
        const userStore = useUserStore()
        const charState = ref('Idle')
        const counter = ref(1)
        const right = ref(20)
        const top = ref(250)
        const attacking = ref(false)
        const topMonst = ref(175)
        const showHit = ref(false)
        const opacity = ref(1)
        const gameStore = useGameStore()
        const hit = ref(0)


        onBeforeRouteLeave(() => { clearInterval(intervalMain) })


        const { turn, actionInProgress, gameover, userStrFromItems, monsterLife, monsterHit, playerHit } = storeToRefs(gameStore)

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
                    turn.value = 'user'
                    charState.value = 'Idle'
                    topMonst.value = 175
                    actionInProgress.value = false

                }
            }
            counter.value++;
            if (counter.value > 9) {
                if (charState.value === "attack") {
                    playerHit.value = true
                    topMonst.value = 168
                    charState.value = "runback";

                }
                counter.value = 1;

            }
        }, 40);




        watch(gameover, () => {
            if (gameover.value === true) {
                charState.value = 'Idle'

            }
        })

        watch(turn, () => {
            if (turn.value === 'monster' && charState.value === 'Idle' && gameover.value === false) {
                setAttack()
            }
        })

        watch(monsterHit, () => {

            if (monsterHit.value === true && gameover.value === false) {
                console.log(userStore.user)
                hit.value = (Math.floor(Math.random() * ((userStore.user.str + userStrFromItems.value) - Math.floor(userStore.user.str / 2)) + Math.floor(userStore.user.str / 2)))
                monsterLife.value = monsterLife.value - hit.value
                showHit.value = true
                const interval = setInterval(() => {
                    top.value = top.value + 10
                    opacity.value = opacity.value - 0.1
                    if (top.value === 350) {
                        showHit.value = false
                        monsterHit.value = false
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
        const getImageUrl = (name, counter) => {

            return new URL(`../../assets/game/ninja/${name}_${counter}.png`, import.meta.url).href
        }

        return { getImageUrl, charState, counter, setAttack, right, showHit, top, opacity, topMonst, hit }
    }



}
</script>