import Router from 'express';
const router = Router();
import imagesController from '../controllers/images.controller.js'


router.post('/:id', imagesController.createImage);


export default router;