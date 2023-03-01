<template>
    <div class="m-7 rounded-md shadow-xl bg-[#cbe3cb] p-3">
        <h2 class="text-gray-800 font-bold">{{ item.name }}</h2>
        <div class="pt-5 pb-4 ">{{ item.description }}</div>
        <div class="flex space-x-5">
            <div class="bg-gray-800 p-2 rounded-sm text-white">{{ item.short }}</div>
            <div class="bg-purple-800 p-2 rounded-sm text-white">{{ item.cost }}</div>
            <div class="bg-indigo-800 p-2 rounded-sm text-white hover:cursor-pointer hover:shadow-2xl hover:bg-indigo-600">
                Start training</div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {

    props: ['trainingItem'],
    setup(props) {
        const item = ref(props.trainingItem)
        return { item }
    }
}
</script>