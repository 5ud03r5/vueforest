<template>
    <div class="flex flex-col bg-[url('@/assets/game/bg_forest.png')] h-[720px]">
        <div class="mx-auto bg-gray-800 text-white p-2 rounded-sm shadow-xl mt-10">Training points : 10</div>
        <div class="mx-auto">
            <TrainingItem v-for="item in trainingItems" :key="item" :trainingItem="item"></TrainingItem>
        </div>

    </div>
</template>

<script>
import TrainingItem from '../components/training/TrainingItem.vue';
export default {
    components: {
        TrainingItem
    },
    setup() {
        const trainingItems = [
            { name: 'Wood choping', description: 'Seems like you wanna chop some wood huh? I have a task for you... Bring me some wood and i will reward you...', short: 'Increases strength by 3', cost: '3 TP' },
            { name: 'Abra kadabra', description: 'Do you want to try some magic? Do you see these ugly rats? Transform them into pigs, we gonna need some food for a dinner.. Hurry up!', short: 'Increases magic power by 2', cost: '3 TP' }]
        return { trainingItems }
    }
}

</script>