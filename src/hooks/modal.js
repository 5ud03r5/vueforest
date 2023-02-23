import { ref } from "vue";

const useModal = (item) => {
  const whatOpened = ref("");
  const modalOpened = ref(false);

  const openModal = () => {
    modalOpened.value = true;
    whatOpened.value = item;
  };
  const closeModal = () => {
    modalOpened.value = false;
  };
  return { modalOpened, openModal, whatOpened, closeModal };
};

export default useModal;
