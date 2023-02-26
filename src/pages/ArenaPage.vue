<template>
    <div class="flex justify-center space-x-10" @kedown.space="setJump">
        <div v-if="!charIsLoading"
            class=" justify-center space-y-3  bg-gradient-to-b from-gray-800 to-gray-900 h-max w-max p-5 rounded-xl shadow-xl">

            <CharacterInfo :data="charData"></CharacterInfo>
            <div class="mx-auto space-y-10">
                <TheEquipment></TheEquipment>
                <TheStatistics :data="charData"></TheStatistics>
            </div>



        </div>
        <div v-else class="flex flex-col justify-center space-y-3 ">
            <div class="flex justify-center space-x-10">Loading...</div>
        </div>
        <div
            class="flex flex-col justify-center space-y-3  bg-gradient-to-b from-gray-800 to-gray-900 w-[1200px] h-[800px] p-5 rounded-xl shadow-xl">
            <TheGame></TheGame>


        </div>
        <div v-if="!isLoading"
            class=" justify-center space-y-3  bg-gradient-to-b from-gray-800 to-gray-900 h-max w-max p-5 rounded-xl shadow-xl">

            <MonsterInfo :monsterType="monsterType"></MonsterInfo>
            <div class="mx-auto space-y-10">
                <MonsterEquipment></MonsterEquipment>
                <MonsterStatistics :data="data"></MonsterStatistics>
            </div>



        </div>
        <div v-else class="flex flex-col justify-center space-y-3 ">
            <div class="flex justify-center space-x-10">Loading...</div>
        </div>




    </div>
</template>

<script>
import CharacterInfo from '../components/mycharacter/CharacterInfo.vue';
import TheEquipment from '../components/mycharacter/TheEquipment.vue';
import TheStatistics from '../components/mycharacter/TheStatistics.vue';
import MonsterInfo from '../components/monster/MonsterInfo.vue'
import { inject, ref } from 'vue'
import { useQuery } from 'vue-query';
import TheGame from '../components/game/TheGame.vue';
import MonsterEquipment from '../components/monster/MonsterEquipment.vue'
import MonsterStatistics from '../components/monster/MonsterStatistics.vue'
import { db } from '../includes/firebase';
import { doc } from '@firebase/firestore';
import { useGetSnap } from '@/hooks/query'


export default {
    components: {
        TheEquipment,
        TheStatistics,
        CharacterInfo,
        TheGame,
        MonsterInfo,
        MonsterEquipment,
        MonsterStatistics
    },
    setup() {
        const monsterType = ref('bandit')

        const docRef = doc(db, "monster", monsterType.value);
        const useMonsterQuery = () => {
            return useQuery(["monster", monsterType.value], () => useGetSnap(docRef));
        }
        const { data, isLoading } = useMonsterQuery()
        const charData = inject('data')
        const setJump = () => {
            console.log('ll')
        }

        const charIsLoading = inject('isLoading')
        return { charData, charIsLoading, data, isLoading, setJump, monsterType }

    }


}

</script>