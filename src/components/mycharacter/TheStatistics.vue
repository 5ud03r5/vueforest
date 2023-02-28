<template>
    <div class="flex space-x-20 bg-gray-600  rounded-md p-2 shadow-xl w-[180px]">

        <ul class=" flex flex-col space-y-3 text-white">
            <li title="strength" :class="backStat"><img :class="imgClass" src="../../assets/strength.svg" />
                <div class="bg-red-200 h-5 rounded-xl" :style="{ width: data.str + 'px' }"></div><span>{{ data.str +
                    str }}</span>
            </li>
            <li title="magic power" :class="backStat"><img :class="imgClass" src="../../assets/magic.svg" />
                <div class="bg-indigo-200 h-5 rounded-xl" :style="{ width: data.mpower + 'px' }"></div>
                <span>{{ data.mpower + mpower }}</span>
            </li>
            <li title="stamina" :class="backStat"><img :class="imgClass" src="../../assets/stamina.svg" />
                <div class="bg-orange-200 h-5 rounded-xl" :style="{ width: data.stamina + 'px' }"></div><span>{{
                    data.stamina }}</span>
            </li>
            <li title="health points" :class="backStat"><img :class="imgClass" src="../../assets/hp.svg" />
                <div class="bg-red-600 h-5 rounded-xl" :style="{ width: life + 'px' }"></div><span>{{ life }}</span>
            </li>
            <li title="mana points" :class="backStat"><img :class="imgClass" src="../../assets/mp.svg" />
                <div class="bg-blue-600 h-5 rounded-xl" :style="{ width: data.mp + 'px' }"></div><span>{{ data.mp }}</span>
            </li>
        </ul>
    </div>
</template>

<script >
import { ref, watch } from 'vue';
import { useGameStore } from '../../stores/game';
import { useUserStore } from '../../stores/user';
export default {
    props: ['data'],
    setup(props) {
        const userStore = useUserStore()
        const gameStore = useGameStore()
        const backStat = ref('flex items-center space-x-1')
        const imgClass = ref('h-6')
        const data = userStore.user
        const life = ref(gameStore.userLife)
        const str = ref(0)
        const mpower = ref(0)
        const armor = ref(0)


        gameStore.charData = props.data
        Object.values(Object.fromEntries(
            Object.entries(userStore.user.equipment)
                .filter(([_, item]) => item.def)
                .map(([key, item]) => [key, { ...item }]))).map(item => armor.value = armor.value + item.def)
        Object.values(Object.fromEntries(
            Object.entries(userStore.user.equipment)
                .filter(([_, item]) => item.str)
                .map(([key, item]) => [key, { ...item }]))).map(item => str.value = str.value + item.str)
        Object.values(Object.fromEntries(
            Object.entries(userStore.user.equipment)
                .filter(([_, item]) => item.mp)
                .map(([key, item]) => [key, { ...item }]))).map(item => mpower.value = mpower.value + item.mp)
        gameStore.userArmorFromItems = armor.value
        gameStore.userStrFromItems = str.value
        gameStore.userMpowerFromItems = mpower.value
        watch(gameStore, () => {
            if (gameStore.userLife <= 0) {
                life.value = 0
            } else {
                life.value = gameStore.userLife
            }

        })
        return { backStat, imgClass, data, life, str, mpower }
    }

}

</script>

<style scoped></style>