import Router from 'express';
const router = Router();
import imagesController from '../controllers/images.controller.js';
import upload from '../middlewares/upload.js'


router.get('/', imagesController.getImages);
router.get('/:id', imagesController.getImage);
router.post('/profileUser', upload.single('image') , imagesController.createImageProfileUser);
router.post('/product', upload.single('image') , imagesController.createImageProduct);
router.post('/profileStore', upload.single('image') , imagesController.createImageProfileStore);

export default router;