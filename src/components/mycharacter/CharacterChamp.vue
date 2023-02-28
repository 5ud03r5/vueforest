<template>
    <div class="relative" @mouseenter="displayActions = true" @click="displayActions = true"
        @mouseleave="displayActions = false">
        <img :class="charClass" :src='charPic' :style="{ left: left ? left + 'px' : null }" />
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
                <img title="super attack" class="h-16 hover:cursor-pointer" src="@/assets/game/knight/super.svg" />
            </div>

        </div>




    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useGameStore } from '@/stores/game'
import { useUserStore } from '../../stores/user';
export default {
    setup() {
        const userStore = useUserStore()
        const attacking = ref(false)
        const counter = ref(1);
        const left = ref(null)
        let round = 1
        const heal = ref(0)
        const hit = ref(null)
        const actionInProgress = ref(false)
        const top = ref(250)
        const showHit = ref(false)
        const opacity = ref(1)
        const gameStore = useGameStore()
        const charState = ref('idle');
        const showHeal = ref(false)
        const charClass = ref('absolute h-44 top-[-163px]')
        onBeforeRouteLeave(() => { clearInterval(intervalMain), console.log('here') })
        const setJump = (event) => {
            console.log(event);
        };
        const setAttack = (event) => {
            actionInProgress.value = true
            gameStore.gameInProgress = true
            charState.value = "run";
        }

        const setHeal = () => {
            actionInProgress.value = true
            gameStore.gameInProgress = true
            gameStore.turn = 'monster'
            heal.value = (Math.floor(Math.random() * ((userStore.user.mpower + gameStore.userMpowerFromItems) - 2) + 2))
            if ((gameStore.userLife + heal.value) > 100) {
                gameStore.userLife = 100
            } else {
                gameStore.userLife = gameStore.userLife + heal.value
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
                    charState.value = 'idle'
                    round = 0
                    left.value = 0
                    console.log(gameStore.turn)
                    gameStore.turn = 'monster'


                }
            }
            counter.value++;
            if (counter.value > 9) {
                if (charState.value === "attack") {
                    gameStore.monsterHit = true

                    charState.value = "runback";

                }
                counter.value = 1;

            }
        }, 40);
        const charPic = ref("/src/assets/game/knight/" + charState.value + "_" + counter.value + ".png");
        const displayActions = ref(false)

        watch(counter, () => {
            charPic.value = "/src/assets/game/knight/" + charState.value + "_" + counter.value + ".png";
        });
        watch(gameStore, () => {
            if (gameStore.actionInProgress === false) {
                actionInProgress.value = false
                gameStore.actionInProgress = true
            }
            if (gameStore.playerHit === true && attacking.value === false) {
                attacking.value = true
                hit.value = (Math.floor(Math.random() * (gameStore.monsterStr - Math.floor(gameStore.monsterStr / 2)) + Math.floor(gameStore.monsterStr / 2)))
                let firstCombatAction = gameStore.userArmorFromItems - hit.value
                if (firstCombatAction > 0) {
                    if (hit.value - firstCombatAction < 0) {
                        hit.value = 0
                    } else {
                        hit.value = hit.value - (gameStore.userArmorFromItems - hit.value)


                    }
                }
                gameStore.userLife = gameStore.userLife - hit.value



                showHit.value = true
                const interval = setInterval(() => {
                    top.value = top.value + 10
                    opacity.value = opacity.value - 0.1
                    if (top.value === 350) {
                        showHit.value = false
                        top.value = 250
                        opacity.value = 1
                        gameStore.playerHit = false
                        attacking.value = false
                        clearInterval(interval)
                    }
                }, 50)
            }
        })


        return { charPic, setAttack, setJump, displayActions, charClass, left, actionInProgress, top, opacity, showHit, setHeal, showHeal, hit, heal };
    },



}
</script>