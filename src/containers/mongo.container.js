import _ from 'lodash';

class MongoContainer {

    constructor(model, productModel) {
        this.model = model;
        this.productModel = productModel;
    };

    async create(data) {
        try{
            return await this.model.create(data);
        }catch(err){
            throw new Error(err.message);
        }
    };

    async getAll() {
        try{
            return await this.model.find();
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async getOne(uuid) {
        try{
            return await this.model.findOne({uuid: uuid});
        }catch(err){
            throw new Error(err);
        }
    };

    async update(uuid, body) {
        try{
            await this.model.updateOne({uuid: uuid}, {$set: {name: body.name, description: body.description, image:body.image, price: body.price, stock: body.stock}});
            return await this.getOne(uuid);
        }catch(err){
            throw new Error(err);
        }
    };

    async delete(uuid) {
        try{
            let data = await this.model.deleteOne({uuid: uuid});
            return data.deletedCount === 0 ? null : data;
        }catch(err){
            throw new Error(err);
        }
    };

    async addProduct(uuidCart, uuidProduct) {
        try{
            const product = await this.productModel.findOne({uuid: uuidProduct});
            if(_.isNil(product)){
                return 'Product not found'
            }
            await this.model.updateOne({uuid: uuidCart}, {$push: {products: product}});
            const updated = await this.getOne(uuidCart);
            return _.isNil(updated) ? 'Cart not found' : updated;
        }catch(err){
            throw new Error(err);
        }
    };

    async deleteProduct(uuidCart, uuidProduct) {
        try{
            const product = await this.productModel.findOne({uuid: uuidProduct});
            if(_.isNil(product)){
                return 'Product not found'
            }
            await this.model.updateOne({uuid: uuidCart}, {$pull: {products: product}});
            const updated = await this.getOne(uuidCart);
            return _.isNil(updated) ? 'Cart not found' : updated;
        }catch(err){
            throw new Error(err);
        }
    };
};

export default MongoContainer;
