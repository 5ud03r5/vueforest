<template>
    <div>
        <ul class="flex flex-col space-y-2 items-center">
            <img class="h-32" src="../../assets/dwarf.svg" />
            <li class="text-white">{{ data.nickname }} <span class="text-cyan-300">{{ data.level }} lvl</span></li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: ['data'],
    setup(props) {
        const data = ref(props.data)
        return { data }
    }
}
</script>