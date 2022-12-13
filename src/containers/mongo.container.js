class MongoContainer {

    constructor(model) {
        this.model = model;
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
};

export default MongoContainer;
