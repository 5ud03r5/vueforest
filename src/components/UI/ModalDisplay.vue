<template>
    <div class="fixed top-0 left-0 z-[1055] h-full w-full bg-gray-800 bg-opacity-60">
        <dialog class=" bg-gray-800 text-white mt-48 z-[1055] " open>
            <h2>{{ item }}</h2>
            <div>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz
                pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później
                zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w
                latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z
                zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach
                osobistych, jak Aldus PageMaker</div>
            <button class=" bg-green-800 p-1 rounded-md " @click="closeModal">Close</button>
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