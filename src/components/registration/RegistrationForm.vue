<template>
    <div
        class="flex flex-col text-gray-800 text-white animate-fade1 mt-10 h-max mt-20 bg-[#cbe3cb] p-5 w-96 shadow-2xl rounded-md ">
        <form @submit.prevent="register">
            <div class="text-gray-800">
                <div class="flex justify-center mb-5">
                    <h2 class="text-2xl text-gray-800 font-extrabold ">Register</h2>
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
                <div><label class="text-gray-800">Password</label></div>
                <input :class="registerClass" type="password" ref="password1" placeholder="Enter password..." />
            </div>
            <div>

                <div><label class="text-gray-800">Confirm password</label></div>
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
                            exp: 0, unspent: 0,
                            equipment: {
                                a1necklace: { name: 'necklace', rank: 'basic', mp: 1 }, a2helmet: { name: 'helmet', rank: 'basic', def: 1 }, a3earrings: { name: 'earrings', rank: 'basic', mp: 1 },
                                a5armor: { name: 'armor', rank: 'basic', def: 3 }, a4main: { name: 'main', rank: 'basic', str: 1 }, a6off: { name: 'off', rank: 'basic', def: 2 },
                                a7ringFirst: { name: 'ringFirst', rank: 'basic', mp: 1 }, a8legs: { name: 'legs', rank: 'basic', def: 2 },
                                a9ringSecond: { name: 'ringSecond', rank: 'basic', mp: 1 }, zagloves: { name: 'gloves', rank: 'basic', def: 1 }, zboots: { name: 'boots', rank: 'basic', def: 1 }
                            },
                            level: 1, str: 5, mpower: 5, hp: 100, cp: 0
                        });


                        userStore.userLoggedIn = true

                        router.push('/')

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