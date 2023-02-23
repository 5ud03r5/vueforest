<template>
    <div class="flex flex-col justify-center space-y-3 ">
        <CharacterInfo></CharacterInfo>
        <div class="flex justify-center space-x-10">
            <TheEquipment></TheEquipment>
            <TheStatistics></TheStatistics>
        </div>

    </div>
</template>

<script>
import CharacterInfo from '../components/mycharacter/CharacterInfo.vue';
import TheEquipment from '../components/mycharacter/TheEquipment.vue';
import TheStatistics from '../components/mycharacter/TheStatistics.vue'
export default {
    components: {
        TheEquipment,
        TheStatistics,
        CharacterInfo
    }
}

</script>