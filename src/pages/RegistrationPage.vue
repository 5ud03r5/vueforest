<template>
    <div class="flex justify-center bg-[url('@/assets/game/bg_forest.png')] h-[720px]">
        <RegistrationForm></RegistrationForm>
    </div>
</template>

<script>
import RegistrationForm from '../components/registration/RegistrationForm.vue';
export default {
    components: {
        RegistrationForm
    }
}
</script>
