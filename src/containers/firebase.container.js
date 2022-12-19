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
    Timestamp,
    arrayUnion,
    arrayRemove
  } from 'firebase/firestore';
  
  import {db} from '../config/firebase.config.js';
  import _ from 'lodash';
  
  class FirebaseContainer {

    constructor(collection) {
      this.collection = collection;
    };
    
    async create(data) {
      await addDoc(collection(db, this.collection), {
        timestamp: Timestamp.fromDate(new Date()),
        ...data
      });
      return { ...data };
    };

    async getAll() {
      const data = await getDocs(query(collection(db, this.collection)));
      const items = data.docs.map(i => i.data());
      return items;
    };

    async getOne(uuid) {
        const data = await getDocs(query(collection(db, this.collection), where("uuid", "==", uuid)));
        const item = data.docs.map(i => ({
          id: i.id,
          ...i.data()
        }));
        return _.isEmpty(item) ? null : item[0];
    };

    async delete(uuid) {
        const data = await getDocs(query(collection(db, this.collection), where("uuid", "==", uuid)));
        const itemId = data.docs.map(i => i.id);
        return _.isEmpty(itemId) ? null : await deleteDoc(doc(db, this.collection, itemId.toString()));  
    };

    async addProduct(uuidCart, uuidProduct) {
      try{
          const product = await getDocs(query(collection(db, 'products'), where("uuid", "==", uuidProduct)));
          const productData = product.docs.map(i => i.data())
          if(_.isEmpty(productData)){
              return 'Product not found'
          }
          const cart = await this.getOne(uuidCart);
          if(_.isEmpty(cart)){
            return 'Cart not found'
          }
          const postRef = doc(db, this.collection, cart.id);
          await updateDoc(postRef, {
            products: arrayUnion(productData[0])
          });
          return await this.getOne(uuidCart);
      }catch(err){
          throw new Error(err);
      }
  };

  async deleteProduct(uuidCart, uuidProduct) {
    try{
        const product = await getDocs(query(collection(db, 'products'), where("uuid", "==", uuidProduct)));
        const productData = product.docs.map(i => i.data())
        if(_.isEmpty(productData)){
            return 'Product not found'
        }
        const cart = await this.getOne(uuidCart);
        if(_.isEmpty(cart)){
          return 'Cart not found'
        }
        const postRef = doc(db, this.collection, cart.id);
        await updateDoc(postRef, {
          products: arrayRemove(productData[0])
        });
        return await this.getOne(uuidCart);
    }catch(err){
        throw new Error(err);
    }
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