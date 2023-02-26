<template>
    <div class="flex space-y-2 flex-col relative">
        <div name="equipment" class="bg-gray-600  rounded-md p-4 shadow-xl">
            <div class="flex">
                <div name="necklace" title="necklace" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'necklace')">
                    <img src="../../assets/necklace.svg" alt="necklace" class="h-10" />
                </div>
                <div name="helmet" title="helmet" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'helmet')">
                    <img src="../../assets/helmet.svg" alt="helmet" class="h-10" />
                </div>
                <div name="earrings" title="earrings" :class="itemClass" @mouseleave="setHideItem"
                    @click="setShowItem($event, 'earrings')" @mouseenter="setShowItem($event, 'earrings')">
                    <img src="../../assets/earrings.svg" alt="earrings" class="h-10" />
                </div>
            </div>


            <div class="flex">
                <div name="main" title="main hand" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'main')">
                    <img src="../../assets/main.svg" alt="main hand" class="h-10" />
                </div>
                <div name="armor" title="armor" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'armor')">
                    <img src="../../assets/armor.svg" alt="armor" class="h-10" />
                </div>
                <div name="off" title="off hand" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'off')">
                    <img src="../../assets/off.svg" alt="off hand" class="h-10" />
                </div>
            </div>
            <div class="flex">
                <div name="ringFirst" title="first ring" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'ringFirst')">
                    <img src="../../assets/ring.svg" alt="first ring" class="h-10" />
                </div>
                <div name="legs" title="legs" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'legs')">
                    <img src="../../assets/legs.svg" alt="legs" class="h-10" />
                </div>
                <div name="ringSecond" title="second ring" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'ringSecond')">
                    <img src="../../assets/ring.svg" alt="second ring" class="h-10" />
                </div>
            </div>
            <div class="flex">
                <div name="gloves" title="gloves" :class="itemClass" @mouseenter="setShowItem($event, 'gloves')"
                    @mouseleave="setHideItem">
                    <img src="../../assets/gloves.svg" alt="gloves" class="h-10" />
                </div>
                <div name="boots" title="boots" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'boots')">
                    <img src="../../assets/boots.svg" alt="boots" class="h-10" />
                </div>

            </div>

        </div>
        <teleport to="body">
            <div v-if="showItem" class="shadow-2xl absolute" :style="{ top: top + 'px', left: left + 'px' }">
                <div class="mt-10 flex flex-col justify-center items-center ml-auto mr-auto bg-gray-900 rounded-lg  p-4">
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
import { ref, computed, watch } from 'vue';
const showItem = ref(false)
const clickedItem = ref('shadow-2xl absolute')
const top = ref(null)
const left = ref(null)

const setHideItem = () => {
    showItem.value = false
}

const setShowItem = (event, item) => {
    top.value = event.pageY
    left.value = event.pageX + 10
    clickedItem.value = item
    showItem.value = true
}



const itemClass = ref('bg-gray-200 m-1 hover:cursor-pointer hover:bg-white')

</script>