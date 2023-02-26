<template>
    <div class="flex space-x-20 bg-gray-600  rounded-md p-2 shadow-xl">

        <ul class=" flex flex-col space-y-3 text-white">
            <li title="strength" :class="backStat"><img :class="imgClass" src="../../assets/strength.svg" />
                <div class="bg-red-200 h-5 rounded-xl" :style="{ width: data.str + 'px' }"></div><span>{{ data.str }}</span>
            </li>

            <li title="health points" :class="backStat"><img :class="imgClass" src="../../assets/hp.svg" />
                <div class="bg-red-600 h-5 rounded-xl" :style="{ width: data.hp + 'px' }"></div><span>{{ data.hp }}</span>
            </li>
            <li title="experience" :class="backStat"><img :class="imgClass" src="../../assets/exp.svg" />
                <div class="bg-orange-600 h-5 rounded-xl" :style="{ width: data.exp + 'px' }"></div><span>{{ data.exp
                }}</span>
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