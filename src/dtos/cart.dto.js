class CartDto{
    constructor(data){
        this.uuid = data.uuid,
        this.name = data.name,
        this.products = data.products,
        this.timestamp = data.timestamp
    }

    build(){
        return this
    }
};

export default CartDto