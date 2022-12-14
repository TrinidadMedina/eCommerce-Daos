import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true
        }, 
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: () => Date.now() / 1000,
        }
    },
);

const productModel = model('products', productSchema);

export { productModel };