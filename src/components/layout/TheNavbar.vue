<template>
    <nav class="">
        <ul class="flex justify-center space-x-10 p-4 bg-gray-800 text-slate-100 shadow-xl fixed w-full z-[2000]">
            <RouterLink to="/">Home</RouterLink>

            <RouterLink v-if="!userStore.userLoggedIn" to="/register">Register</RouterLink>
            <RouterLink v-if="!userStore.userLoggedIn" to="/login">Login</RouterLink>
            <div @click="logout" class="hover:cursor-pointer" v-else>Logout</div>
        </ul>
    </nav>
</template>

<script setup>
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router'
import { auth } from '../../includes/firebase';
const userStore = useUserStore()
const router = useRouter()
const logout = async () => {
    await auth.signOut()
    userStore.userLoggedIn = false
    router.push('/login')
}

</script>