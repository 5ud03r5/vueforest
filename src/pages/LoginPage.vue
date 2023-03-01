<template>
    <div class="flex justify-center bg-[url('@/assets/game/bg_forest.png')] h-[720px]">
        <LoginForm></LoginForm>
    </div>
</template>


<script>
import LoginForm from '../components/login/LoginForm.vue';
export default {
    components: {
        LoginForm
    }
}
</script>
