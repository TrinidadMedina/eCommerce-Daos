import MongoContainer from '../../containers/mongo.container.js';
import { cartModel } from '../../models/cart.model.js';
import { productModel } from '../../models/product.model.js';

class MongoCartDao extends MongoContainer {
  constructor() {
    super(cartModel, productModel);
  };
};

export default MongoCartDao;
