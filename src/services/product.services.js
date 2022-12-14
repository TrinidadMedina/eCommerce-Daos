import dotenv from 'dotenv';
dotenv.config();

const DaoService = await (
  await import(`../daos/product/${process.env.DATACORE}.product.dao.js`)
).default 

class ProductServices {

    constructor() {
      this.dao = new DaoService();
    };

    async createProduct(data) {
      const newProduct = await this.dao.create(data);
      return newProduct;
    };

    async getProducts() {
      const products = await this.dao.getAll();
      return products;
    };

    async getProduct(uuid) {
      const product = await this.dao.getOne(uuid);
      return product;
    };

    async updateProduct(uuid, body) {
      const product = await this.dao.update(uuid, body);
      return product;
    };

    async deleteProduct(uuid) {
      const deletedProduct = await this.dao.delete(uuid);
      return deletedProduct;
    };
};

export default new ProductServices();