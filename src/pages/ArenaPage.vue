<template>
    <div class="flex justify-center space-x-10">

        <div v-if="!isLoading"
            class=" justify-center space-y-3  bg-gradient-to-b from-gray-800 to-gray-900 h-max w-max p-5 rounded-xl shadow-xl">

            <CharacterInfo :data="data"></CharacterInfo>
            <div class="mx-auto space-y-10">
                <TheEquipment :data="data"></TheEquipment>
                <TheStatistics :data="data"></TheStatistics>
            </div>



        </div>

        <div class="flex flex-col justify-center space-y-3 w-[1200px] h-[800px] p-5 ">
            <TheGame></TheGame>


        </div>
        <div
            class=" justify-center space-y-3  bg-gradient-to-b from-gray-800 to-gray-900 h-max w-max p-5 rounded-xl shadow-xl">

            <MonsterInfo></MonsterInfo>
            <div class="mx-auto space-y-10">
                <MonsterStatistics></MonsterStatistics>
            </div>



        </div>

        <teleport to="body">
            <ModalDisplay v-if="gameover" @modalClose="modalClose"></ModalDisplay>
        </teleport>




    </div>
</template>

<script>
import CharacterInfo from '../components/mycharacter/CharacterInfo.vue';
import TheEquipment from '../components/mycharacter/TheEquipment.vue';
import TheStatistics from '../components/mycharacter/TheStatistics.vue';
import MonsterInfo from '../components/monster/MonsterInfo.vue'
import { ref, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router';
import { useQueryClient, useQuery } from 'vue-query';

import TheGame from '../components/game/TheGame.vue';
import { storeToRefs } from 'pinia';
import MonsterStatistics from '../components/monster/MonsterStatistics.vue'
import { getDoc, doc } from '@firebase/firestore';
import { db, auth } from '../includes/firebase';


import { useGameStore } from '../stores/game';

import ModalDisplay from '../components/UI/ModalDisplay.vue';
const getSnap = async (docRef) => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('Document does no exist')
    }
}

export default {
    components: {
        TheEquipment,
        TheStatistics,
        CharacterInfo,
        TheGame,
        MonsterInfo,
        MonsterStatistics,
        ModalDisplay
    },

    setup() {
        const monsterType = ref('bandit')

        const queryClient = useQueryClient()
        const gameStore = useGameStore()
        const { gameover, gameInProgress } = storeToRefs(gameStore)

        const docRef = doc(db, "users", auth.currentUser.uid);
        const useCharacterQuery = () => {
            return useQuery(["users"], () => getSnap(docRef));
        }
        const { isLoading, data } = useCharacterQuery();

        const modalClose = () => {
            gameStore.resetOnCloseModalValues()
        }
        onBeforeRouteLeave((to, from, next) => {
            if (gameInProgress.value) {
                const userWantsToLeave = confirm('Are you sure wanna leave the arena? All your data will be lost.')
                if (userWantsToLeave) {
                    gameStore.resetValues()
                }
                next(userWantsToLeave)
            }
            queryClient.invalidateQueries(["users"]);
            gameStore.resetValues()
            next()


        })



        return { data, isLoading, monsterType, gameover, modalClose }

    }


}

</script>