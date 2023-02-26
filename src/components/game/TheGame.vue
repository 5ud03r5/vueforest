<template>
    <div>
        <img class=" w-[1150px] " src="@/assets/game/bg_forest.png" />
        <div class="relative">
            <CharacterChamp />
            <MonsterChamp></MonsterChamp>
        </div>
        <GameBackground />
    </div>
</template>

<script>
import MonsterChamp from '../monster/MonsterChamp.vue';
import CharacterChamp from '../mycharacter/CharacterChamp.vue';
import GameBackground from '../UI/GameBackground.vue'
export default {
    components: {
        MonsterChamp,
        CharacterChamp,
        GameBackground
    },

}

</script>