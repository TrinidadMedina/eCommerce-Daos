import { Router } from "express";
import productRouter from './product/product.routes.js';
import cartRouter from './cart/cart.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
    res.status(200).json({
        health: 'up',
        enviroment: process.env.ENVIROMENT || 'Undefined'
    });
})
.use('/products', productRouter)
.use('/carts', cartRouter)

export default router;