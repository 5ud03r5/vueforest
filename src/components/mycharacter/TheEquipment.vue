<template>
    <div class="flex space-y-2 flex-col">
        <div name="equipment" class="bg-gray-600 w-max min-w-max">
            <div class="flex">
                <div name="necklace" title="necklace" :class="itemClass" @click="setShowItem('necklace')"
                    @mouseenter="setShowItem('necklace')">
                    <img src="../../assets/necklace.svg" alt="necklace" class="h-10" />
                </div>
                <div name="helmet" title="helmet" :class="itemClass" @click="setShowItem('helmet')"
                    @mouseenter="setShowItem('helmet')">
                    <img src="../../assets/helmet.svg" alt="helmet" class="h-10" />
                </div>
                <div name="earrings" title="earrings" :class="itemClass" @click="setShowItem('earrings')"
                    @mouseenter="setShowItem('earrings')">
                    <img src="../../assets/earrings.svg" alt="earrings" class="h-10" />
                </div>
            </div>


            <div class="flex">
                <div name="main" title="main hand" :class="itemClass" @click="setShowItem('main')"
                    @mouseenter="setShowItem('main')">
                    <img src="../../assets/main.svg" alt="main hand" class="h-10" />
                </div>
                <div name="armor" title="armor" :class="itemClass" @click="setShowItem('armor')"
                    @mouseenter="setShowItem('armor')">
                    <img src="../../assets/armor.svg" alt="armor" class="h-10" />
                </div>
                <div name="off" title="off hand" :class="itemClass" @click="setShowItem('off')"
                    @mouseenter="setShowItem('off')">
                    <img src="../../assets/off.svg" alt="off hand" class="h-10" />
                </div>
            </div>
            <div class="flex">
                <div name="ringFirst" title="first ring" :class="itemClass" @click="setShowItem('ringFirst')"
                    @mouseenter="setShowItem('ringFirst')">
                    <img src="../../assets/ring.svg" alt="first ring" class="h-10" />
                </div>
                <div name="legs" title="legs" :class="itemClass" @click="setShowItem('legs')"
                    @mouseenter="setShowItem('legs')">
                    <img src="../../assets/legs.svg" alt="legs" class="h-10" />
                </div>
                <div name="ringSecond" title="second ring" :class="itemClass" @click="setShowItem('ringSecond')"
                    @mouseenter="setShowItem('ringSecond')">
                    <img src="../../assets/ring.svg" alt="second ring" class="h-10" />
                </div>
            </div>
            <div class="flex">
                <div name="gloves" title="gloves" :class="itemClass" @click="setShowItem('gloves')"
                    @mouseenter="setShowItem('gloves')">
                    <img src="../../assets/gloves.svg" alt="gloves" class="h-10" />
                </div>
                <div name="boots" title="boots" :class="itemClass" @click="setShowItem('boots')"
                    @mouseenter="setShowItem('boots')">
                    <img src="../../assets/boots.svg" alt="boots" class="h-10" />
                </div>

            </div>

        </div>
        <teleport to="body">
            <div v-if="showItem" class="w-96 mx-auto shadow-2xl">
                <div class="mt-10 flex flex-col justify-center items-center ml-auto mr-auto bg-gray-600  p-4">
                    <div name="equipment" class="text-purple-200">{{ clickedItem }}</div>
                    <div name="rank" class="text-pink-400">Legendary</div>
                    <div name="strength" class="text-gray-100">Strength 10</div>
                    <div name="mp" class="text-gray-100">Magic power 10</div>
                    <div name="stamina" class="text-gray-100">Stamina 10</div>
                </div>
            </div>
        </teleport>


    </div>
</template>

<script setup>
import { ref } from 'vue';
const showItem = ref(false)
const clickedItem = ref('')

const setShowItem = (item) => {
    clickedItem.value = item
    showItem.value = true
}

const itemClass = ref('bg-gray-200 m-1 hover:cursor-pointer hover:bg-white')

</script>