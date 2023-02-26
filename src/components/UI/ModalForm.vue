<template>
    <div class="fixed top-0 left-0 z-[1055] h-full w-full bg-gray-800 bg-opacity-60">
        <dialog class=" bg-gray-300 mt-48 z-[1055] rounded-lg" open>
            <form @submit.prevent="submitModal">
                <textarea ref="textValue" rows="10" placeholder="Type some text here..."
                    class="resize-none w-[400px] overflow-hidden focus:outline-none rounded-lg p-2"></textarea>

                <div class="flex justify-end space-x-5"><button @click="closeModal" type="button"
                        class="text-black bg-gray-100 p-2 rounded-md ">Cancel</button><button type="submit"
                        class="text-white bg-green-800 p-2 rounded-md ">Create</button></div>
            </form>


        </dialog>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    emits: ['formSubmited', 'closeModal'],
    setup(_, context) {

        const textValue = ref(null)
        const submitModal = () => {
            if (textValue.value.value.trim().length > 0) {
                context.emit('formSubmited', textValue.value.value)
            } else {
                alert('You need to add some text')
            }

        }
        const closeModal = () => {

            context.emit('closeModal', true)


        }
        return { submitModal, textValue, closeModal }
    }
}

</script>