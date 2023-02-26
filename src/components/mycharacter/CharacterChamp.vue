<template>
    <div class="relative" @mouseenter="displayActions = true" @mouseleave="displayActions = false">
        <img :class="charClass" :src='charPic' :style="{ left: left ? left + 'px' : null }" />


        <div v-if="displayActions && !actionInProgress" class="absolute z-[1000] top-[-220px]">
            <div class="flex space-x-3 ">
                <img title="attack" @click="setAttack" class="h-16 hover:cursor-pointer"
                    src="@/assets/game/knight/attack.svg" />
                <img title="heal" class="h-16 hover:cursor-pointer" src="@/assets/game/knight/block.svg" />
                <img title="super attack" class="h-16 hover:cursor-pointer" src="@/assets/game/knight/super.svg" />
            </div>

        </div>

    </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
    setup() {

        const counter = ref(1);
        const left = ref(null)
        let round = 1
        const actionInProgress = ref(false)
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
                if (left.value > 600) {
                    counter.value = 1;
                    charState.value = 'attack'
                }
            }
            counter.value++;
            if (counter.value > 9) {
                if (charState.value === "attack") {
                    charState.value = "idle";
                    actionInProgress.value = false
                    left.value = 0
                    round = 0
                }
                counter.value = 1;

            }
        }, 70);
        const charPic = ref("/src/assets/game/knight/" + charState.value + "_" + counter.value + ".png");
        const displayActions = ref(false)

        watch(counter, () => {
            charPic.value = "/src/assets/game/knight/" + charState.value + "_" + counter.value + ".png";
        });

        return { charPic, setAttack, setJump, displayActions, charClass, left, actionInProgress };
    },



}
</script>