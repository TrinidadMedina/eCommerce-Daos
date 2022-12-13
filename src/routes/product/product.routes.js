import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/product.controllers.js';

const router = Router();
router
.post('/', createProduct)
.get('/', getProducts)
.get('/:uuid', getProduct)
.put('/:uuid', updateProduct)
.delete('/:uuid', deleteProduct)

export default router;