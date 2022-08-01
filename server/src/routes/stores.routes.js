import Router from 'express';
const router = Router();
import storeController from '../controllers/stores.controllers.js';

router.get('/', storeController.getStores);
router.get('/images/', storeController.getStoresWithImage);
router.get('/keyword/:keyword', storeController.getStoresByKeyword);
router.get('/:id', storeController.getStore);
router.post('/', storeController.createStore);
router.put('/:id', storeController.editStore);
router.delete('/:id', storeController.deleteStore);


export default router;