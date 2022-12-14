import { Router } from 'express';
import {
  createCart,
  getCarts,
  getCart,
  deleteCart,
  addProduct,
  deleteProduct
} from '../../controllers/cart.controllers.js';

const router = Router();
router
.post('/', createCart)
.get('/', getCarts)
.get('/:uuid', getCart)
.delete('/:uuid', deleteCart)
.post('/:uuidCart/:uuidProduct', addProduct)
.delete('/:uuidCart/:uuidProduct', deleteProduct)

export default router;