<template>
    <nav class="bg-[#cee6cf] pb-4">
        <div class="container mx-auto  p-4  text-slate-100 w-[1000px] z-[2000]">

            <div class="float-left flex space-x-10" v-if="userStore.userLoggedIn">
                <RouterLink to="/arena" :class="linkClass">
                    <span>ARENA</span>
                </RouterLink>

                <RouterLink :class="linkClass" to="/crafting">
                    <span>CRAFTING</span>
                </RouterLink>

                <RouterLink :class="linkClass" to="/training">
                    <span>TRAINING</span>
                </RouterLink>
            </div>


            <div class="float-right flex space-x-10">
                <RouterLink :class="linkClass" to="/">HOME</RouterLink>

                <RouterLink :class="linkClass" v-if="!userStore.userLoggedIn" to="/register">REGISTER</RouterLink>
                <RouterLink :class="linkClass" v-if="!userStore.userLoggedIn" to="/login">LOGIN</RouterLink>
                <div :class="linkClass" @click="logout" class="hover:cursor-pointer" v-else>LOGOUT</div>
            </div>





        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { auth } from '../../includes/firebase';
const linkClass = ref('text-gray-900 font-black hover:text-cyan-900')
const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
    await auth.signOut()
    userStore.userLoggedIn = false
    router.push('/login')
}

</script>