<template>
    <div>
        <ul class="flex flex-col space-y-2 items-center">
            <img class="h-32" src="../../assets/game/knight/Head.png" />
            <li v-if="data" class="text-white">{{ data.nickname }} <span class="text-cyan-300">{{ data.level }} lvl</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'
export default {
    props: ['data'],
    setup(props) {
        const userStore = useUserStore()
        const data = ref(props.data)
        console.log(data)
        return { data }
    }
}
</script>