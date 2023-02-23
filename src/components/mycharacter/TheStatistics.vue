<template>
    <div class="flex space-x-20 bg-gray-600 p-2">

        <ul class=" flex flex-col space-y-3 text-white">
            <li title="strength" :class="backStat"><img :class="imgClass" src="../../assets/strength.svg" />
                <div class="bg-red-200 h-5 rounded-xl" :style="{ width: 60 + 'px' }"></div><span>60</span>
            </li>
            <li title="magic power" :class="backStat"><img :class="imgClass" src="../../assets/magic.svg" />
                <div class="bg-indigo-200 h-5 rounded-xl" :style="{ width: 43 + 'px' }"></div><span>43</span>
            </li>
            <li title="stamina" :class="backStat"><img :class="imgClass" src="../../assets/stamina.svg" />
                <div class="bg-orange-200 h-5 rounded-xl" :style="{ width: 48 + 'px' }"></div><span>48</span>
            </li>
            <li title="health points" :class="backStat"><img :class="imgClass" src="../../assets/hp.svg" />
                <div class="bg-red-600 h-5 rounded-xl" :style="{ width: 15 + 'px' }"></div><span>15</span>
            </li>
            <li title="mana points" :class="backStat"><img :class="imgClass" src="../../assets/mp.svg" />
                <div class="bg-blue-600 h-5 rounded-xl" :style="{ width: 100 + 'px' }"></div><span>100</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const backStat = ref('flex items-center space-x-1')
const imgClass = ref('h-6')
</script>

<style scoped></style>