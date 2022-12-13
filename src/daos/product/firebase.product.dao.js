import FirebaseContainer from '../../containers/firebase.container.js';

class FirebaseProductsDao extends FirebaseContainer {
  constructor() {
    super('products');
  };
};

export default FirebaseProductsDao;