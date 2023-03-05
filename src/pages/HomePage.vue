<template>
    <div class=" h-[720px]  bg-[url('@/assets/game/bg_forest.png')]">
        <div class="relative container text-[80px] font-black text-gray-800 mx-auto w-[1000px] flex flex-col">
            <div class="animate-fade1">Welcome in Vue game</div>
            <div class="container items-end mx-auto">
                <img class="absolute right-10 h-[500px] animate-fade1" :src="charRun" />
            </div>
        </div>

        <div class="container  mx-auto w-[1000px] animate-slide items-end">

            <div class=" animate-fade text-[40px] font-black text-gray-600 ">Browser based rpg game</div>
            <div class="mb-8 animate-fade text-[20px] font-black text-gray-400">Defeat bandits, upgrade you gear and train
                your
                skills</div>
            <div>
                <RouterLink :to="linkTo"
                    class="animate-fade text-[20px] font-black text-gray-200 bg-gray-800 p-3 rounded-lg hover:rounded-xl hover:bg-gray-700 hover:shadow-xl">
                    {{ buttonValue }}
                </RouterLink>
            </div>

        </div>

    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { auth } from '../includes/firebase';
import { ref, watch } from 'vue';
const buttonValue = ref('')
const linkTo = ref('')
const userStore = useUserStore()
const charRun = ref('/src/assets/game/knight/runback_1.png')
const counter = ref(1)
const counterChange = ref(0)
const img = ref('runback')
if (auth.currentUser) {
    buttonValue.value = 'Go to Arena'
    linkTo.value = '/arena'
} else {
    buttonValue.value = 'Login'
    linkTo.value = '/login'
}

setInterval(() => {
    counter.value++
    if (counter.value > 9) {
        counter.value = 1
        counterChange.value++
        if (counterChange.value === 6) {
            img.value = 'attack_back'
            counterChange.value = 0

        } else {
            img.value = 'runback'
        }
    }

}, 90)

watch(counter, () => {
    charRun.value = '/src/assets/game/knight/' + img.value + '_' + counter.value + '.png'
})





</script>