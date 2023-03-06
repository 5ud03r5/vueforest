<template>
  <TheNavbar></TheNavbar>

  <RouterView class="bg-[url('@/assets/game/bg_forest.png')] h-[720px] "></RouterView>
</template>

<script>
import TheNavbar from './components/layout/TheNavbar.vue';

import { useUserStore } from './stores/user';

import { useQueryProvider } from "vue-query";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '@/includes/firebase';
import { useQuery } from "vue-query";


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
  },
  setup() {
    const userStore = useUserStore()
    /* console.log(auth.currentUser)
    if (auth.currentUser) {
 */
    const docRef = doc(db, "users", auth.currentUser.uid);
    const useCharacterQuery = () => {
      return useQuery(["users"], () => getSnap(docRef));
    }
    const { data } = useCharacterQuery();
    userStore.user = data;

    /*     } */






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