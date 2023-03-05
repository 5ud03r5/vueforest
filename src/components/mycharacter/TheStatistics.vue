<template>
    <div class="flex space-x-20 bg-gray-600  rounded-md p-2 shadow-xl w-[180px]">

        <ul class=" flex flex-col space-y-3 text-white">
            <li title="unspent points" :class="backStat"><img :class="imgClass" src="../../assets/stamina.svg" />
                <div class="bg-orange-200 h-5 rounded-xl" :style="{ width: unspent + 'px' }"></div><span>{{
                    unspent }}</span>
            </li>
            <li title="strength" :class="backStat"><img :class="imgClass" src="../../assets/strength.svg" />
                <div class="bg-red-200 h-5 rounded-xl"
                    :style="{ width: (data.str + str + strFromAdd) + 'px', maxWidth: 100 + 'px' }"></div>
                <span>{{ data.str +
                    str + strFromAdd }}</span>
                <span v-if="unspent > 0" @click="addStr" class="hover:cursor-pointer hover:text-gray-800">+
                </span>
            </li>
            <li title="magic power" :class="backStat"><img :class="imgClass" src="../../assets/magic.svg" />
                <div class="bg-indigo-200 h-5 rounded-xl"
                    :style="{ width: (data.mpower + mpower + mpFromAdd) + 'px', maxWidth: 100 + 'px' }">
                </div>
                <span>{{ data.mpower + mpower + mpFromAdd }}</span><span v-if="unspent > 0" @click="addMp"
                    class="hover:cursor-pointer hover:text-gray-800">+</span>
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
import { storeToRefs } from 'pinia';
export default {
    props: ['data'],
    setup(props) {

        const gameStore = useGameStore()
        const backStat = ref('flex items-center space-x-1')
        const imgClass = ref('h-6')
        const data = ref(props.data)

        const { userArmorFromItems, unspentPoints, playerMpower, playerStr, userLife, userStrFromItems, userMpowerFromItems } = storeToRefs(gameStore)
        unspentPoints.value = data.value.unspent

        const addStr = () => {
            playerStr.value++
            unspentPoints.value--

        }
        const addMp = () => {
            playerMpower.value++
            unspentPoints.value--
        }
        Object.values(Object.fromEntries(
            Object.entries(props.data.equipment)
                .filter(([_, item]) => item.def)
                .map(([key, item]) => [key, { ...item }]))).map(item => userArmorFromItems.value = userArmorFromItems.value + item.def)
        Object.values(Object.fromEntries(
            Object.entries(props.data.equipment)
                .filter(([_, item]) => item.str)
                .map(([key, item]) => [key, { ...item }]))).map(item => userStrFromItems.value = userStrFromItems.value + item.str)
        Object.values(Object.fromEntries(
            Object.entries(props.data.equipment)
                .filter(([_, item]) => item.mp)
                .map(([key, item]) => [key, { ...item }]))).map(item => userMpowerFromItems.value = userMpowerFromItems.value + item.mp)



        watch(userLife, () => {
            if (userLife.value <= 0) {
                userLife.value = 0
            }


        })
        return { backStat, imgClass, data, life: userLife, str: userStrFromItems, mpower: userMpowerFromItems, strFromAdd: playerStr, mpFromAdd: playerMpower, addStr, addMp, unspent: unspentPoints }
    }

}

</script>

<style scoped></style>