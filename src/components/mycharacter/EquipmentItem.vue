<template>
    <div :class="itemClass">
        <img :src="imgSource" :alt="item" class="h-10" />
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ['item'],
    setup(props) {

        const imgSource = ref("/src/assets/" + props.item.name + ".svg")
        const itemClass = ref('bg-gray-200 m-1 hover:cursor-pointer hover:bg-white')
        return { itemClass, imgSource }
    }
}


</script>