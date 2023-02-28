<template>
  <TheNavbar></TheNavbar>
  <TheUnderNavbar class="pt-16"></TheUnderNavbar>
  <RouterView class="mt-10"></RouterView>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar.vue';
import TheUnderNavbar from './components/layout/TheUnderNavbar.vue';
import { useUserStore } from './stores/user';
import { useGameStore } from './stores/game';
import { useQueryProvider } from "vue-query";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '@/includes/firebase';
import { useQuery } from "vue-query";
import { provide } from 'vue'

useQueryProvider();

const getSnap = async (docRef) => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('Document does no exist')
  }
}

export default {
  components: {
    TheNavbar,
    TheUnderNavbar
  },
  setup() {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const useCharacterQuery = () => {
      return useQuery(["users", auth.currentUser.uid], () => getSnap(docRef));
    }
    const { isLoading, data } = useCharacterQuery();
    provide('data', data)
    provide('isLoading', isLoading)
    const userStore = useUserStore()
    const gameStore = useGameStore()
    userStore.user = data;



    return { loggedIn: userStore.userLoggedIn }
  }
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 1px
}

/* Track */
::-webkit-scrollbar-track {
  background: #2a2a2a;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2a2a2a;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2a2a2a;
}
</style>