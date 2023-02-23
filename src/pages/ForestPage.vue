<template>
    <div>
        <div class="flex flex-wrap justify-center">
            <img class="h-72 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree4.svg" />
            <img class="h-56 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree2.svg" />
            <img class="h-72 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree1.svg" />
            <img class="h-56 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree3.svg" />
            <img class="h-72 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree6.svg" />
        </div>
        <div class="flex flex-wrap justify-center">
            <img class="h-72 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree1.svg" />
            <img class="h-32 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree3.svg" />
            <img class="h-40 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree4.svg" />
            <img class="h-80 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree5.svg" />
            <img class="h-40 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree6.svg" />
            <img class="h-32 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree2.svg" />
            <img class="h-72 hover:cursor-pointer" @click="openModal" src="../assets/trees/tree3.svg" />
        </div>
        <teleport to="body">
            <ModalDisplay v-if="modalOpened" @modalClose="closeModal"></ModalDisplay>
        </teleport>
    </div>
</template>
<script>
import useModal from '../hooks/modal';
import ModalDisplay from '../components/UI/ModalDisplay.vue';
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