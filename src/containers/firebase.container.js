import {
    collection,
    addDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    getDoc,
    deleteDoc,
    where,
    Timestamp
  } from 'firebase/firestore';
  
  import {db} from '../config/firebase.config.js';
  
  class FirebaseContainer {

    constructor(collection) {
        this.collection = collection;
    };
    
    async create(data) {
        const newItem = await addDoc(collection(db, this.collection), {
            ...data,
            timestamp: Timestamp.fromDate(new Date()),
        });
        
        return { id: newItem.id, ...data };

      };

    async getAll() {
        const data = await getDocs(query(collection(db, this.collection)));
        const products = [];
        data.forEach(i => {
            products.push(i.data());
        });
        return products;
    };

    async getOne(uuid) {
        const data = await getDocs(query(collection(db, this.collection), where("uuid", "==", uuid)));
        const product = [];
        data.forEach(i => {
            product.push(i.data());
        });
        return product[0];
    };


    async delete(uuid) {
        const data = await getDocs(query(collection(db, this.collection), where("uuid", "==", uuid)));
        let itemId;
        let result;
        data.forEach(i => {
            itemId = i.id
        })
        itemId === undefined ? result = 'Item not found' : result = await deleteDoc(doc(db, this.collection, itemId));
        return result;  
    };
      
       // Editing Posts
/*       const editPost = async (id, review, movie, country) => {
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, {
          review,
          movie,
          country,
        });
      }; */

      // Liking Posts
/*       const likingPost = async (idPost) => {
        const postRef = doc(db, 'posts', idPost);
        const post = await getDoc(postRef);
        const likesPost = post.data().likesArr;

        if (likesPost.includes(userUid)) {
          await updateDoc(postRef, {
            likesArr: arrayRemove(userUid),
          });
        } else {
          await updateDoc(postRef, {
            likesArr: arrayUnion(userUid),
          });
        }
      }; */
         
}

export default FirebaseContainer;