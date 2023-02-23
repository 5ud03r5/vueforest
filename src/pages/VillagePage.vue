<template>
    <div>
        <div class="mt-10">
            <div class="flex justify-center">
                <div @click="openModal"><img class="h-48 hover:cursor-pointer" src="../assets/spooky-house.svg" />
                </div>
            </div>
            <div class="flex justify-center space-x-32">
                <div @click="openModal"><img class="h-32 mt-12 hover:cursor-pointer" src="../assets/bank.svg" />
                </div>
                <div @click="openModal"><img class="h-32 mt-4 hover:cursor-pointer" src="../assets/saloon.svg" />
                </div>
            </div>
        </div>
        <teleport to="body">
            <ModalDisplay v-if="modalOpened" :item="whatOpened" @modalClose="closeModal"></ModalDisplay>
        </teleport>
    </div>
</template>

<script>
import ModalDisplay from '../components/UI/ModalDisplay.vue';
import useModal from '../hooks/modal';
import { ref } from 'vue'
export default {
    components: {
        ModalDisplay
    },
    setup() {
        const { modalOpened, openModal, whatOpened, closeModal } = useModal()
        return { modalOpened, openModal, whatOpened, closeModal }
    }
}
</script>