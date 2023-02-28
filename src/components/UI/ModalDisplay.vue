<template>
    <div class="fixed top-0 left-0 z-[1055] h-full w-full bg-gray-800 bg-opacity-60">
        <dialog class=" bg-gray-300 text-gray-800 mt-48 z-[1055] " open>
            <h2>{{ item }}</h2>
            <div class="flex justify-center">GAME OVER</div>
            <div class="flex justify-end">
                <button class=" bg-green-800 p-1 rounded-md" @click="closeModal">Close</button>
            </div>

        </dialog>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    props: ['item'],
    emits: ['modalClose'],
    setup(props, context) {
        const item = ref(props.item)


        const closeModal = () => {
            context.emit('modalClose', false)
        }
        return { item, closeModal }
    }

}

</script>

<style scoped>
dialog {
    width: 600px
}
</style>