<template>
    <div
        class="flex flex-col text-white bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400 p-5 w-96 shadow-2xl rounded-md">
        <form @submit.prevent="register">
            <div>
                <div class="flex justify-center mb-5">
                    <h2 class="text-2xl text-gray-800 font-extrabold register">Register</h2>
                </div>
                <hr class="mb-5">
                <div>
                    <div><label>Nickname</label></div>
                    <input :class="registerClass" type="text" ref="nickname" placeholder="Enter nickname..." />
                </div>
                <div><label>Email</label></div>
                <input :class="registerClass" type="text" ref="email" placeholder="Enter email..." />
            </div>
            <div>
                <div><label>Password</label></div>
                <input :class="registerClass" type="password" ref="password1" placeholder="Enter password..." />
            </div>
            <div>

                <div><label>Confirm password</label></div>
                <input :class="registerClass" type="password" ref="password2" placeholder="Confirm password..." />
            </div>
            <div class="flex justify-end">
                <button class="bg-gray-900 p-2 mt-5 hover:rounded-lg hover:bg-gray-800 rounded-sm hover:shadow-xl"
                    type="submit">Register</button>
            </div>
        </form>

    </div>
</template>

<script>
import { auth, db } from '@/includes/firebase'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from 'vue'
export default {

    setup() {
        const email = ref(null)
        const password1 = ref(null)
        const password2 = ref(null)
        const userCred = ref(null)
        const nickname = ref(null)
        const userStore = useUserStore()
        const router = useRouter();

        const register = async () => {
            if (email.value.value.includes('@') && password1.value.value === password2.value.value && nickname.value.value.trim().length > 0) {
                try {
                    userCred.value = await createUserWithEmailAndPassword(
                        auth, email.value.value, password1.value.value
                    )

                    try {
                        await setDoc(doc(db, 'users', userCred.value.user.uid), {
                            email: email.value.value, nickname: nickname.value.value,
                            equipment: {
                                necklace: { name: 'necklace', rank: 'basic', mp: 1 }, helmet: { name: 'helmet', rank: 'basic', def: 1 }, earrings: { name: 'earrings', rank: 'basic', mp: 1 },
                                armor: { name: 'armor', rank: 'basic', def: 3 }, main: { name: 'main', rank: 'basic', str: 1 }, off: { name: 'off', rank: 'basic', def: 2 },
                                ringFirst: { name: 'ringFirst', rank: 'basic', mp: 1 }, legs: { name: 'legs', rank: 'basic', def: 2 },
                                ringSecond: { name: 'ringSecond', rank: 'basic', mp: 1 }, gloves: { name: 'gloves', rank: 'basic', def: 1 }, boots: { name: 'boots', rank: 'basic', def: 1 }
                            },
                            level: 1, str: 5, mpower: 5, stamina: 100, mp: 100, hp: 100, cp: 0, tp: 0
                        });


                        userStore.userLoggedIn = true

                        router.push('/arena')

                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }


                } catch (error) {
                    console.log(error)
                    alert('An upexpected error occured. Please try again later.')
                    return;
                }



            } else if (!email.value.value.includes('@') || password1.value.value !== password2.value.value) {
                alert('Email invalid or Password doesnt match')
            }

        }

        const registerClass = ref('w-full focus:outline-none focus:shadow-xl rounded-lg p-1 text-black')
        return { registerClass, register, email, password1, password2, nickname }
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