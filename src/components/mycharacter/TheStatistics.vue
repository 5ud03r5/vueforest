<template>
    <div class="flex space-x-20 bg-gray-600 p-2">

        <ul class=" flex flex-col space-y-3 text-white">
            <li title="strength" :class="backStat"><img :class="imgClass" src="../../assets/strength.svg" />
                <div class="bg-red-200 h-5 rounded-xl" :style="{ width: data.str + 'px' }"></div><span>{{ data.str }}</span>
            </li>
            <li title="magic power" :class="backStat"><img :class="imgClass" src="../../assets/magic.svg" />
                <div class="bg-indigo-200 h-5 rounded-xl" :style="{ width: data.mpower + 'px' }"></div>
                <span>{{ data.mpower }}</span>
            </li>
            <li title="stamina" :class="backStat"><img :class="imgClass" src="../../assets/stamina.svg" />
                <div class="bg-orange-200 h-5 rounded-xl" :style="{ width: data.stamina + 'px' }"></div><span>{{
                    data.stamina }}</span>
            </li>
            <li title="health points" :class="backStat"><img :class="imgClass" src="../../assets/hp.svg" />
                <div class="bg-red-600 h-5 rounded-xl" :style="{ width: data.hp + 'px' }"></div><span>{{ data.hp }}</span>
            </li>
            <li title="mana points" :class="backStat"><img :class="imgClass" src="../../assets/mp.svg" />
                <div class="bg-blue-600 h-5 rounded-xl" :style="{ width: data.mp + 'px' }"></div><span>{{ data.mp }}</span>
            </li>
        </ul>
    </div>
</template>

<script >
import { ref } from 'vue';

export default {
    props: ['data'],
    setup(props) {
        const backStat = ref('flex items-center space-x-1')
        const imgClass = ref('h-6')
        const data = ref(props.data)
        return { backStat, imgClass, data }
    }

}

</script>

<style scoped></style>