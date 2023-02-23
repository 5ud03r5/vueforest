<template>
    <div
        class="flex flex-col text-white bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400 p-5 w-96 shadow-2xl rounded-md">
        <form @submit.prevent="login">
            <div>
                <div class="flex justify-center mb-5">
                    <h2 class="text-2xl text-gray-800 font-extrabold register">Login</h2>
                </div>
                <hr class="mb-5">

                <div><label>Email</label></div>
                <input :class="registerClass" type="text" ref="email" placeholder="Enter email..." />
            </div>
            <div>
                <div><label>Password</label></div>
                <input :class="registerClass" type="password" ref="password1" placeholder="Enter password..." />
            </div>

            <div class="flex justify-end">
                <button class="bg-gray-900 p-2 mt-5 hover:rounded-lg hover:bg-gray-800 rounded-sm hover:shadow-xl"
                    type="submit">Login</button>
            </div>
        </form>


    </div>
</template>

<script>
import { auth } from '@/includes/firebase'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from 'vue'
export default {

    setup() {
        const email = ref(null)
        const password1 = ref(null)

        const userCred = ref(null)

        const userStore = useUserStore()
        const router = useRouter();

        const login = async () => {
            if (email.value.value.includes('@') && password1.value.value.trim().length > 0) {
                try {
                    await signInWithEmailAndPassword(auth, email.value.value, password1.value.value)

                } catch (error) {
                    console.log(error)
                    alert('An upexpected error occured. Please try ag1ain later.')
                    return;
                }
                userStore.userLoggedIn = true
                router.push('/mycharacter')
            } else {
                alert('Email or password invalid')
            }

        }

        const registerClass = ref('w-full focus:outline-none focus:shadow-xl rounded-lg p-1 text-black')
        return { registerClass, login, email, password1 }
    }
}
</script>

<style scoped>
.register {

    animation: register 4s infinite alternate
}

@keyframes register {
    from {
        text-shadow: -1px -2px 20px cyan
    }

    to {
        text-shadow: 2px 4px 40px cyan
    }
}
</style>