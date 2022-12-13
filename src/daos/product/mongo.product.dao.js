import MongoContainer from '../../containers/mongo.container.js';
import { productModel } from '../../models/product.model.js';

class MongoProductsDao extends MongoContainer {
  constructor() {
    super(productModel);
  };
};

export default MongoProductsDao;