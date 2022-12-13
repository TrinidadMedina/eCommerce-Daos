import { Router } from 'express';
import {
  createCart,
  getCarts,
  getCart,
  deleteCart
} from '../../controllers/cart.controllers.js';

const router = Router();
router
.post('/', createCart)
.get('/', getCarts)
.get('/:uuid', getCart)
.delete('/:uuid', deleteCart)

export default router;