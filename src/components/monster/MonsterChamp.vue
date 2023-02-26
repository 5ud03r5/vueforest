<template>
    <div class="">
        <img class="absolute h-44 top-[-175px] right-4 " :src='monsterPic' />
    </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
    setup() {
        const charState = ref('idle')
        const counter = ref(1)
        const monsterPic = ref("/src/assets/game/ninja/" + charState.value + "_" + counter.value + ".png")
        setInterval(() => {

            counter.value++
            if (counter.value > 9) {
                if (charState.value === 'attack') {
                    charState.value = 'idle'
                }
                counter.value = 1

            }
        }, 70);

        watch(counter, () => {
            monsterPic.value = "/src/assets/game/ninja/" + charState.value + "_" + counter.value + ".png"
        })
        const setAttack = () => {

            charState.value = 'attack'
            counter.value = 1
        }
        return { monsterPic, setAttack }
    }



}
</script>