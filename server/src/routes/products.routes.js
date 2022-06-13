import Router from 'express';
const router = Router();
import productController from '../controllers/products.controller.js';

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);
router.get('/products/:id', productController.getProductByStore);
router.post('/products/:id', productController.createProduct);
router.put('/products/:id', productController.editProduct);
router.delete('/products/:id', productController.deleteProduct);


export default router;