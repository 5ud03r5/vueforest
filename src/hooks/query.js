import {
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "@firebase/firestore";
import { postsCollection, db } from "../includes/firebase";

("");

const useGetSnap = async (docRef) => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("Document does no exist");
  }
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
const useGetAllDocs = async () => {
  const querySnapshot = await getDocs(postsCollection);
  return querySnapshot.docs.map((doc) => doc.data());
};

const useAddDoc = async (newPost) => {
  let returnedValue = "";
  try {
    returnedValue = await addDoc(postsCollection, {});
    try {
      await setDoc(doc(db, "posts", returnedValue.id), {
        id: returnedValue.id,
        owner: newPost.owner,
        body: newPost.body,
        enchanted: 0,
        punched: 0,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const useAddComment = async (array) => {
  try {
    return await updateDoc(doc(db, "posts", array[0]), {
      comments: arrayUnion(array[1]),
    });
  } catch (e) {
    console.error("Error adding comment: ", e);
  }
};

const useGetPost = async (post) => {
  try {
    const querySnap = await getDoc(doc(db, "posts", post));
    return querySnap.data();
  } catch (e) {
    console.error("Error fetching post: ", e);
  }
};

const prefetchPosts = async (queryClient) => {
  await queryClient.prefetchQuery(["posts"], useGetAllDocs);
};

export {
  useAddDoc,
  useGetAllDocs,
  prefetchPosts,
  useAddComment,
  useGetPost,
  useGetSnap,
};
