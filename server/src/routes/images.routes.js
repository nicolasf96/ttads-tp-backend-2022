import Router from 'express';
const router = Router();
import imagesController from '../controllers/images.controller.js';
import upload from '../middlewares/upload.js'


router.get('/', imagesController.getImages);
router.get('/:id', imagesController.getImage);
router.post('/', upload.single('image') , imagesController.createImage);


export default router;