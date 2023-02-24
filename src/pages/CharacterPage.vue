<template>
    <div>
        <div v-if="!isLoading" class="flex flex-col justify-center space-y-3 ">
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
import { inject } from 'vue'





export default {
    components: {
        TheEquipment,
        TheStatistics,
        CharacterInfo
    },
    setup() {
        const data = inject('data')
        const isLoading = inject('isLoading')
        return { data, isLoading }

    }


}

</script>