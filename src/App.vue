<template>
  <TheNavbar></TheNavbar>
  <TheUnderNavbar class="pt-16 "></TheUnderNavbar>
  <RouterView class="mt-10"></RouterView>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar.vue';
import TheUnderNavbar from './components/layout/TheUnderNavbar.vue';


export default {
  components: {
    TheNavbar,
    TheUnderNavbar
  }
}
</script>