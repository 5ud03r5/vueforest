<template>
    <div class="flex space-y-2 flex-col relative">
        <div name="equipment" class="bg-gray-600  rounded-md p-4 shadow-xl">
            <div class="flex">
                <div name="necklace" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'necklace')">
                    <img src="../../assets/necklace.svg" alt="necklace" class="h-10" />
                </div>
                <div name="helmet" :class="itemClass" @mouseleave="setHideItem" @mouseenter="setShowItem($event, 'helmet')">
                    <img src="../../assets/helmet.svg" alt="helmet" class="h-10" />
                </div>
                <div name="earrings" :class="itemClass" @mouseleave="setHideItem" @click="setShowItem($event, 'earrings')"
                    @mouseenter="setShowItem($event, 'earrings')">
                    <img src="../../assets/earrings.svg" alt="earrings" class="h-10" />
                </div>
            </div>


            <div class="flex">
                <div name="main" :class="itemClass" @mouseleave="setHideItem" @mouseenter="setShowItem($event, 'main')">
                    <img src="../../assets/main.svg" alt="main hand" class="h-10" />
                </div>
                <div name="armor" :class="itemClass" @mouseleave="setHideItem" @mouseenter="setShowItem($event, 'armor')">
                    <img src="../../assets/armor.svg" alt="armor" class="h-10" />
                </div>
                <div name="off" :class="itemClass" @mouseleave="setHideItem" @mouseenter="setShowItem($event, 'off')">
                    <img src="../../assets/off.svg" alt="off hand" class="h-10" />
                </div>
            </div>
            <div class="flex">
                <div name="ringFirst" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'ringFirst')">
                    <img src="../../assets/ring.svg" alt="first ring" class="h-10" />
                </div>
                <div name="legs" :class="itemClass" @mouseleave="setHideItem" @mouseenter="setShowItem($event, 'legs')">
                    <img src="../../assets/legs.svg" alt="legs" class="h-10" />
                </div>
                <div name="ringSecond" :class="itemClass" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, 'ringSecond')">
                    <img src="../../assets/ring.svg" alt="second ring" class="h-10" />
                </div>
            </div>
            <div class="flex">
                <div name="gloves" :class="itemClass" @mouseenter="setShowItem($event, 'gloves')" @mouseleave="setHideItem">
                    <img src="../../assets/gloves.svg" alt="gloves" class="h-10" />
                </div>
                <div name="boots" :class="itemClass" @mouseleave="setHideItem" @mouseenter="setShowItem($event, 'boots')">
                    <img src="../../assets/boots.svg" alt="boots" class="h-10" />
                </div>

            </div>

        </div>
        <teleport to="body">
            <div v-if="showItem" class="shadow-2xl absolute" :style="{ top: top + 'px', left: left + 'px' }">
                <div class="mt-10 flex flex-col justify-center items-center ml-auto mr-auto bg-gray-900 rounded-lg  p-4">
                    <div name="equipment" class="text-purple-200">{{ clickedItem.name }}</div>
                    <div name="rank" :class="clickedItem.rank === 'basic' ? 'text-gray-100' : 'text-pink-400'">{{
                        clickedItem.rank }}</div>
                    <div v-if="clickedItem.str" name="strength" class="text-gray-100">Strength {{ clickedItem.str }}</div>
                    <div v-if="clickedItem.mp" name="mp" class="text-gray-100">Magic power {{ clickedItem.mp }}</div>
                    <div v-if="clickedItem.def" name="armor" class="text-gray-100">Armor {{ clickedItem.def }}</div>

                </div>
            </div>
        </teleport>


    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useUserStore } from '../../stores/user';

export default {
    props: ['data'],
    setup(props) {
        const showItem = ref(false)

        const clickedItem = ref(null)

        const top = ref(null)
        const left = ref(null)

        const setHideItem = () => {
            showItem.value = false
        }

        const setShowItem = (event, value) => {
            top.value = event.pageY
            left.value = event.pageX + 10

            clickedItem.value = Object.fromEntries(
                Object.entries(props.data.equipment)
                    .filter(([_, item]) => item.name === value)
                    .map(([key, item]) => [key, { ...item }])
            )
            clickedItem.value = Object.values(clickedItem.value)[0]

            showItem.value = true
        }



        const itemClass = ref('bg-gray-200 m-1 hover:cursor-pointer hover:bg-white')
        return { itemClass, setShowItem, clickedItem, setHideItem, showItem, top, left }
    }
}

</script>