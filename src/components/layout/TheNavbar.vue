<template>
    <nav class="bg-[#cee6cf] pb-4 h-20">
        <div class="container mx-auto  p-4  text-slate-100 w-[1000px] z-[2000]">




            <div class="float-right flex space-x-10">


                <RouterLink :class="linkClass" v-if="!userStore.userLoggedIn" to="/register">REGISTER</RouterLink>
                <RouterLink :class="linkClass" v-if="!userStore.userLoggedIn" to="/login">LOGIN</RouterLink>
                <div :class="linkClass" @click="logout" class="hover:cursor-pointer" v-else>LOGOUT</div>
                <RouterLink :class="homeLinkClass" to="/">HOME</RouterLink>
            </div>





        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { auth } from '../../includes/firebase';
const linkClass = ref('text-gray-900 font-black hover:text-cyan-900 p-4')
const homeLinkClass = ref('text-gray-900 font-black hover:text-cyan-900 hover:bg-gray-200 hover:shadow-xl p-3 border-4 rounded-2xl')
const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
    await auth.signOut()
    userStore.userLoggedIn = false
    router.push('/login')
}

</script>