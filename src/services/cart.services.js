import dotenv from 'dotenv';
dotenv.config();

const DaoService = await (
  await import(`../daos/cart/${process.env.DATACORE}.cart.dao.js`)
).default 
  
class CartServices { 
    constructor() {
        this.dao = new DaoService();
    };

    async createCart(data) {
        const newCart = await this.dao.create(data);
        return newCart;
    };

    async getCarts() {
        const carts = await this.dao.getAll();
        return carts;
    };

    async getCart(uuid) {
        const carts = await this.dao.getOne(uuid);
        return carts;
    };

    async deleteCart(uuid) {
        const carts = await this.dao.delete(uuid);
        return carts;
    };

    async addProduct(uuidCart, uuidProduct) {
        const cart = await this.dao.addProduct(uuidCart, uuidProduct);
        return cart;
    };

    async deleteProduct(uuidCart, uuidProduct) {
        const cart = await this.dao.deleteProduct(uuidCart, uuidProduct);
        return cart;
    }
};

export default new CartServices();