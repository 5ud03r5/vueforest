<template>
    <div>
        <ul class="flex flex-col space-y-2 items-center">
            <img class="h-32" src="../../assets/game/ninja/ninja.svg" />
            <li class="text-white">{{ monster.name }} <span class="text-red-600">{{ monster.level }} lvl</span></li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useQueryClient } from 'vue-query';
export default {
    props: ['monsterType'],
    setup(props) {
        const queryClient = useQueryClient()
        const monster = ref(queryClient.getQueryData(['monster', props.monsterType]))
        return { monster }

    }

}
</script>