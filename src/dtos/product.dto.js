class ProductDto{
    constructor(data){
        this.uuid = data.uuid,
        this.name = data.name,
        this.description = data.description,
        this.image = data.image,
        this.price = data.price,
        this.stock = data.stock,
        this.timestamp = data.timestamp
    }

    build(){
        return this
    }
};

export default ProductDto