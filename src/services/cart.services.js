/* const DaoService = await (
  await import(`../daos/product/${process.env.DATACORE}.product.dao.js`)
).default */

const DaoService = await (await import(`../daos/cart/memory.cart.dao.js`)).default
  
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
};

export default new CartServices();