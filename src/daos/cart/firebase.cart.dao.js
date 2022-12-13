import FirebaseContainer from '../../containers/firebase.container.js';

class FirebaseCartDao extends FirebaseContainer {
  constructor() {
    super('carts');
  };
};

export default FirebaseCartDao;