<template>
    <div @click="closeModal" class="fixed top-0 left-0 z-[1055] h-full w-full bg-gray-800 bg-opacity-60">
        <dialog class=" bg-gray-300 h-[300px] text-gray-800 mt-48 z-[1055] rounded-xl " open>
            <div class="flex justify-end">
                <button class=" bg-gray-800 font-black pl-3 pr-3 pb-1 rounded-md text-gray-300 text-[20px]"
                    @click="closeModal">x</button>
            </div>
            <div class="flex font-black p-20 text-[40px] justify-center">GAME OVER</div>


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