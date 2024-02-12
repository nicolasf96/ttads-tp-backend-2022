import Router from 'express';
const router = Router();
import productController from '../controllers/products.controller.js';

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/store/:id', productController.getProductByStore);
router.post('/', productController.createProduct);
router.put('/:id', productController.editProduct);
router.delete('/:id', productController.deleteProduct);


export default router;