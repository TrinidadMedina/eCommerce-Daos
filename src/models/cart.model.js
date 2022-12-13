import { Schema, model } from "mongoose";

const cartSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        products: {
            type: []
        },
        timestamp: {
            type: Date,
            default: () => Date.now() / 1000,
        },
    }
);

const cartModel = model('carts', cartSchema);

export { cartModel };