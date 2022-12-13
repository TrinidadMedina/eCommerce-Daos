import MongoContainer from '../../containers/mongo.container.js';
import { cartModel } from '../../models/cart.model.js';

class MongoCartDao extends MongoContainer {
  constructor() {
    super(cartModel);
  };
};

export default MongoCartDao;