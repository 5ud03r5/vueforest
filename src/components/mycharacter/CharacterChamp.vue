<template>
    <div class="relative" @mouseenter="displayActions = true" @mouseleave="displayActions = false">
        <img :class="charClass" :src='charPic' :style="{ left: left ? left + 'px' : null }" />

        <KeepAlive>
            <div v-if="displayActions && !actionInProgress" class="absolute z-[1000] top-[-220px]">
                <div class="flex space-x-3 ">
                    <img title="attack" @click="setAttack" class="h-16 hover:cursor-pointer"
                        src="@/assets/game/knight/attack.svg" />
                    <img title="heal" class="h-16 hover:cursor-pointer" src="@/assets/game/knight/block.svg" />
                    <img title="super attack" class="h-16 hover:cursor-pointer" src="@/assets/game/knight/super.svg" />
                </div>

            </div>
        </KeepAlive>



    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useGameStore } from '@/stores/game'
export default {
    setup() {

        const counter = ref(1);
        const left = ref(null)
        let round = 1
        const actionInProgress = ref(false)
        const gameStore = useGameStore()
        const charState = ref("idle");
        const charClass = ref('absolute h-44 top-[-163px]')
        const setJump = (event) => {
            console.log(event);
        };
        const setAttack = (event) => {
            actionInProgress.value = true

            charState.value = "run";
        }

        setInterval(() => {
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
            if (charState.value === 'runback') {
                actionInProgress.value = true
            } else {
                actionInProgress.value = gameStore.actionInProgress
            }


        })

        return { charPic, setAttack, setJump, displayActions, charClass, left, actionInProgress };
    },



}
</script>