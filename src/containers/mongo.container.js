import _ from 'lodash';

class MongoContainer {

    constructor(model, productModel) {
        this.model = model;
        this.productModel = productModel;
    };

    async create(data) {
        try{
            const newItem = await this.model.create(data);
            return newItem;
        }catch(err){
            throw new Error(err.message);
        }
    };

    async getAll() {
        try{
            const data = await this.model.find();
            return data;
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async getOne(uuid) {
        try{
            const data = await this.model.findOne({uuid: uuid});
            return data;
        }catch(err){
            throw new Error(err);
        }
    };

    async update(uuid, body) {
        try{
            await this.model.updateOne({uuid: uuid}, {$set: {name: body.name, description: body.description, image:body.image, price: body.price, stock: body.stock}});
            const productUpdated = await this.getOne(uuid);
            return productUpdated;
        }catch(err){
            throw new Error(err);
        }
    };

    async delete(uuid) {
        try{
            let data = await this.model.deleteOne({uuid: uuid});
            if(!data.deletedCount){
                data = 'Cart not found';
            }
            return data;
        }catch(err){
            throw new Error(err);
        }
    };

    async addProduct(uuidCart, uuidProduct) {
        try{
            const product = await this.productModel.findOne({uuid: uuidProduct});
            if(_.isNil(product)){
                return null
            }
            await this.model.updateOne({uuid: uuidCart}, {$push: {products: product}});
            const cartUpdated = await this.getOne(uuidCart);
            return cartUpdated;
        }catch(err){
            throw new Error(err);
        }
    };

    async deleteProduct(uuidCart, uuidProduct) {
        try{
            const product = await this.productModel.findOne({uuid: uuidProduct});
            if(_.isNil(product)){
                return null
            }
            const updated = await this.model.updateOne({uuid: uuidCart}, {$pull: {products: product}});
            if(updated.modifiedCount === 0){
                return 'Product not found'
            }
            console.log(updated)
            const cartUpdated = await this.getOne(uuidCart);
            return cartUpdated;
        }catch(err){
            throw new Error(err);
        }
    };
};

export default MongoContainer;
