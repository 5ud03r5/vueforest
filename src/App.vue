<template>
  <TheNavbar></TheNavbar>
  <TheUnderNavbar class="pt-16"></TheUnderNavbar>
  <RouterView class="mt-10"></RouterView>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar.vue';
import TheUnderNavbar from './components/layout/TheUnderNavbar.vue';
import { useUserStore } from './stores/user';
import { auth } from './includes/firebase';
export default {
  components: {
    TheNavbar,
    TheUnderNavbar
  },
  setup() {
    const userStore = useUserStore()

    return { loggedIn: userStore.userLoggedIn }
  }
}
</script>