<template>
    <div class="flex space-y-2 flex-col relative">
        <div name="equipment" class="bg-gray-600  rounded-md p-4 shadow-xl w-[178px]">
            <div class="flex flex-wrap">
                <EquipmentItem :name="item.name" v-for="item in sortedEq" :key="item" :item="item" @mouseleave="setHideItem"
                    @mouseenter="setShowItem($event, item.name)"></EquipmentItem>
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
import { ref, computed, reactive } from 'vue';
import { useUserStore } from '../../stores/user';
import EquipmentItem from './EquipmentItem.vue';

export default {
    components: {
        EquipmentItem
    },
    props: ["data"],
    setup(props) {
        const showItem = ref(false);
        const clickedItem = ref(null);
        const top = ref(null);
        const left = ref(null);
        const equipment = reactive(props.data.equipment);
        const setHideItem = () => {
            showItem.value = false;
        };
        const setUpgrade = () => {
        };
        const sortedEq = computed(() => {
            return Object.fromEntries(Object.entries(props.data.equipment).sort())
        })
        const setShowItem = (event, value) => {
            top.value = event.pageY;
            left.value = event.pageX + 10;
            clickedItem.value = Object.fromEntries(Object.entries(props.data.equipment)
                .filter(([_, item]) => item.name === value)
                .map(([key, item]) => [key, { ...item }]));
            clickedItem.value = Object.values(clickedItem.value)[0];
            showItem.value = true;
        };
        const itemClass = ref("bg-gray-200 m-1 hover:cursor-pointer hover:bg-white");
        return { itemClass, setShowItem, clickedItem, setHideItem, showItem, top, left, setUpgrade, sortedEq };
    },
    components: { EquipmentItem }
}

</script>