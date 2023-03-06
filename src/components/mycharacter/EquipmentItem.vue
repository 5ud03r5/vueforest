<template>
    <div :class="itemClass">
        <img :src="'/src/assets/' + itemName + '.svg'" :alt="item" class="h-10" />
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    props: ['item'],
    setup(props) {
        const itemName = ref(props.item.name)
        const itemClass = ref('bg-gray-200 m-1 hover:cursor-pointer hover:bg-white relative')
        return { itemClass, itemName }
    }
}


</script>