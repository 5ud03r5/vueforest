<template>
    <div>
        <div v-if="data" class="flex flex-col justify-center space-y-3 ">
            <CharacterInfo :data="data"></CharacterInfo>
            <div class="flex justify-center space-x-10">
                <TheEquipment></TheEquipment>
                <TheStatistics :data="data"></TheStatistics>
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
import TheStatistics from '../components/mycharacter/TheStatistics.vue'
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../includes/firebase';
import { ref, reactive, isRef } from 'vue'
export default {
    components: {
        TheEquipment,
        TheStatistics,
        CharacterInfo
    },
    setup() {

        const docRef = doc(db, "users", auth.currentUser.uid);
        const data = ref(null)
        const getSnap = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                data.value = docSnap.data()
            } else {
                console.log('Document does no exist')
            }
        }
        getSnap()



        return { data }

    }


}

</script>