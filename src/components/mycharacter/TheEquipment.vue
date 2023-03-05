<template>
    <div class="flex space-y-2 flex-col relative">
        <div name="equipment" class="bg-gray-600  rounded-md p-4 shadow-xl w-[178px]">
            <div class="flex flex-wrap">
                <EquipmentItem class="relative" :name="item.name" v-for="item in sortedEq" :key="item" :item="item"
                    @mouseleave="setHideItem" @mouseenter="setShowItem($event, item.name)">
                </EquipmentItem>
                <div v-if="showUpgrade"
                    class=" hover: cursor-pointer bg-cyan-400 text-white p-2 absolute shadow-xl rounded-xl left-[50px] top-[-4px] flex space-x-4">
                    <div>Upgrade</div>

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
import { ref, computed } from 'vue';
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
        const showUpgrade = ref(false)

        const setUpgrade = (event, item) => {
            showUpgrade.value = !showUpgrade.value
        }
        const setHideItem = () => {
            showItem.value = false;
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
        return { itemClass, setShowItem, clickedItem, setHideItem, showItem, top, left, sortedEq, setUpgrade, showUpgrade };
    },
    components: { EquipmentItem }
}

</script>