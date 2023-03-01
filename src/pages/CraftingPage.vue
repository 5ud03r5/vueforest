<template>
        <div class="flex flex-col justify-center space-y-7">
                <div class="mx-auto bg-gray-800 text-white p-2 rounded-sm shadow-xl">Crafting points : 10</div>
                <div class="flex justify-center">
                        <div draggable="true" @dragstart="startDrag($event, 'helmet')"> <img :class='itemClass'
                                        src="../assets/helmet.svg" /></div>
                        <div draggable="true" @dragstart="startDrag($event, 'armor')"> <img :class='itemClass'
                                        src="../assets/armor.svg" /></div>
                        <div draggable="true" @dragstart="startDrag($event, 'legs')"> <img :class='itemClass'
                                        src="../assets/legs.svg" />
                        </div>
                        <div draggable="true" @dragstart="startDrag($event, 'boots')"> <img :class='itemClass'
                                        src="../assets/boots.svg" /></div>
                        <div draggable="true" @dragstart="startDrag($event, 'main')"> <img :class='itemClass'
                                        src="../assets/main.svg" />
                        </div>
                        <div draggable="true" @dragstart="startDrag($event, 'off')"> <img :class='itemClass'
                                        src="../assets/off.svg" />
                        </div>
                        <div draggable="true" @dragstart="startDrag($event, 'gloves')"> <img :class='itemClass'
                                        src="../assets/gloves.svg" /></div>
                </div>
                <div class="mx-auto w-20 h-20 bg-gray-300" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent> <img
                                :src="item" />
                </div>
                <div class="mx-auto" title="Craft"><img
                                class="h-20 bg-gray-600 m-1 p-2 hover:cursor-pointer hover:shadow-xl hover:bg-gray-400"
                                src="../assets/crafter.svg" /></div>
        </div>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
export default {
        setup() {
                const store = useUserStore()
                console.log(store.userLoggedIn)
                const itemClass = ref('h-10 bg-gray-300 m-1 hover:cursor-pointer')
                const items = [{ name: 'helmet', src: '/src/assets/helmet.svg' },
                { name: 'legs', src: '/src/assets/legs.svg' },
                { name: 'armor', src: '/src/assets/armor.svg' },
                { name: 'boots', src: '/src/assets/boots.svg' },
                { name: 'main', src: '/src/assets/main.svg' },
                { name: 'off', src: '/src/assets/off.svg' },
                { name: 'gloves', src: '/src/assets/gloves.svg' }]
                const item = ref('')
                const startDrag = (evt, item) => {
                        evt.dataTransfer.dropEffect = 'move'
                        evt.dataTransfer.effectAllowed = 'move'
                        evt.dataTransfer.setData('itemName', item)
                }

                const onDrop = (evt) => {
                        const itemName = evt.dataTransfer.getData('itemName')
                        const itemFiltered = items.find((item) => item.name === itemName)
                        item.value = itemFiltered.src
                }


                return { itemClass, startDrag, onDrop, item }
        }
}

</script>

