import MemoryContainer from '../../containers/memory.container.js';
import productsServices from '../../services/product.services.js';
import _ from 'lodash';

class MemoryCartsDao extends MemoryContainer {
  constructor() {
    super();
  }

  async addProduct(uuidCart, uuidProduct) {
    try{
      const index = this.array.findIndex(i => i.uuid === uuidCart);
      if (index < 0) {
        return 'Cart not found';
      }
      const product = await productsServices.getProduct(uuidProduct);
      if(_.isNil(product)){
        return 'Product not found'
      }
      this.array[index].products.push(product);
      return this.array[index];
    }catch(err){
        throw new Error(err.message);
    }
  };

  async deleteProduct(uuidCart, uuidProduct) {
    try{
      const index = this.array.findIndex(i => i.uuid === uuidCart);
      if (index < 0) {
        return 'Cart not found';
      }
      const product = await productsServices.getProduct(uuidProduct);
      if(_.isNil(product)){
        return 'Product not found'
      }
      this.array[index].products = this.array[index].products.filter(i => i.uuid !== uuidProduct);
      return this.array[index];
    }catch(err){
        throw new Error(err.message);
    }
  };
}
//3d95906e-1aa6-4983-861a-9b5ce9e8c166

export default MemoryCartsDao;