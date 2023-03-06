<template>
    <div class="relative" @mouseenter="displayActions = true" @click="displayActions = true"
        @mouseleave="displayActions = false">
        <img :class="charClass" :src='getImageUrl(charState, counter)' :style="{ left: left ? left + 'px' : null }" />
        <div v-if="showHit" class="absolute z-[2000] text-red-800 text-[50px] font-black h-max w-max p-2"
            :style="{ top: -top + 'px', opacity: opacity }">
            {{ hit === 0 ? 'Miss' : '-' + hit }}
        </div>
        <div v-if="showHeal" class="absolute z-[2000] text-green-800 text-[50px] font-black h-max w-max p-2"
            :style="{ top: -top + 'px', opacity: opacity }">
            +{{ heal }}
        </div>

        <div v-if="displayActions && !actionInProgress" class="absolute z-[1000] top-[-220px]">
            <div class="flex space-x-3 ">
                <img title="attack" @click="setAttack" class="h-16 hover:cursor-pointer"
                    src="@/assets/game/knight/attack.svg" />
                <img title="heal" @click="setHeal" class="h-16 hover:cursor-pointer" src="@/assets/game/knight/block.svg" />

            </div>

        </div>




    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useGameStore } from '@/stores/game'
import { useUserStore } from '../../stores/user';
import { storeToRefs } from 'pinia';
export default {
    setup() {
        const userStore = useUserStore()
        const attacking = ref(false)
        const counter = ref(1);
        const left = ref(null)
        let round = 1
        const heal = ref(0)
        const hit = ref(null)
        const top = ref(250)
        const showHit = ref(false)
        const opacity = ref(1)
        const gameStore = useGameStore()
        const charState = ref('Idle');
        const showHeal = ref(false)
        const charClass = ref('absolute h-44 top-[-163px]')
        onBeforeRouteLeave(() => { clearInterval(intervalMain), console.log('here') })

        const { gameInProgress, userMpowerFromItems, userLife, turn, monsterHit, actionInProgress, gameover, playerHit, monsterStr, userArmorFromItems } = storeToRefs(gameStore)


        const setJump = (event) => {
            console.log(event);
        };
        const setAttack = (event) => {
            actionInProgress.value = true
            gameInProgress.value = true
            charState.value = "run";

        }

        const setHeal = () => {
            actionInProgress.value = true
            gameInProgress.value = true
            turn.value = 'monster'
            heal.value = (Math.floor(Math.random() * ((userStore.user.mpower + userMpowerFromItems.value) - 2) + 2))
            if ((userLife.value + heal.value) > 100) {
                userLife.value = 100
            } else {
                userLife.value = userLife.value + heal.value
            }

            showHeal.value = true
            const intervalHeal = setInterval(() => {
                top.value = top.value + 10
                opacity.value = opacity.value - 0.1
                if (top.value === 350) {
                    showHeal.value = false
                    top.value = 250
                    opacity.value = 1
                    clearInterval(intervalHeal)
                }
            }, 50)

        }

        const intervalMain = setInterval(() => {
            if (charState.value === "run") {

                round = round + 10
                left.value = round
                if (left.value > 930) {
                    counter.value = 1;
                    charState.value = 'attack'
                }
            }
            if (charState.value === "runback") {
                round = round - 10
                left.value = round
                if (left.value < 10) {
                    counter.value = 1;
                    charState.value = 'Idle'
                    round = 0
                    left.value = 0
                    turn.value = 'monster'


                }
            }
            if (counter.value > 9) {
                if (charState.value === "attack") {
                    monsterHit.value = true

                    charState.value = "runback";

                }
                counter.value = 1;

            }
            counter.value++;

        }, 40);


        const charPic = ref("/src/assets/game/knight/" + charState.value + "_" + counter.value + ".png");
        const displayActions = ref(false)

        watch(counter, () => {
            charPic.value = "/src/assets/game/knight/" + charState.value + "_" + counter.value + ".png";
        });

        watch(gameover, () => {
            if (gameover.value === true) {
                charState.value = 'Idle'
                left.value = 0
                round = 0
            }
        })

        watch(playerHit, () => {
            if (playerHit.value === true && attacking.value === false && gameover.value === false) {
                attacking.value = true
                hit.value = (Math.floor(Math.random() * (monsterStr.value - Math.floor(monsterStr.value / 2)) + Math.floor(monsterStr.value / 2)))
                let firstCombatAction = userArmorFromItems.value - hit.value
                if (firstCombatAction > 0) {
                    if (hit.value - firstCombatAction < 0) {
                        hit.value = 0
                    } else {
                        hit.value = hit.value - (userArmorFromItems.value - hit.value)


                    }
                }
                userLife.value = userLife.value - hit.value



                showHit.value = true
                const interval = setInterval(() => {
                    top.value = top.value + 10
                    opacity.value = opacity.value - 0.1
                    if (top.value === 350) {
                        showHit.value = false
                        top.value = 250
                        opacity.value = 1
                        playerHit.value = false
                        attacking.value = false
                        clearInterval(interval)
                    }
                }, 50)
            }
        })
        const getImageUrl = (name, counter) => {

            return new URL(`../../assets/game/knight/${name}_${counter}.png`, import.meta.url).href
        }



        return { charPic, getImageUrl, counter, charState, setAttack, setJump, displayActions, charClass, left, actionInProgress, top, opacity, showHit, setHeal, showHeal, hit, heal };
    },



}
</script>