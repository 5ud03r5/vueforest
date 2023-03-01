<template>
    <ul class="flex pl-7 pr-7 pb-2 space-x-10  bg-[#cee6cf] justify-center flex-wrap">
        <li>

            <RouterLink to="/arena" :class="linkClass"><img :class="imageClass" src="../../assets/warlord-helmet.svg" />
                <span>Arena</span>
            </RouterLink>
        </li>

        <li>
            <RouterLink :class="linkClass" to="/crafting"><img :class="imageClass" src="../../assets/crafting.svg" />
                <span>Crafting</span>
            </RouterLink>
        </li>
        <li>
            <RouterLink :class="linkClass" to="/training"><img :class="imageClass" src="../../assets/jumping-rope.svg" />
                <span>Training</span>
            </RouterLink>
        </li>



    </ul>
</template>

<script setup>
import { ref } from 'vue';
const imageClass = ref('h-6')
const linkClass = ref('flex space-x-2')
</script>
<style scoped>
.router-link-active {
    animation: shadow 3s alternate infinite
}

@keyframes shadow {
    from {
        text-shadow: 1px 1px 10px cyan;
    }

    to {
        text-shadow: -1px -1px 10px black
    }
}
</style>