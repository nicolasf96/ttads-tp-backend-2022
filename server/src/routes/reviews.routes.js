import Router from 'express';
const router = Router();
import reviewController from '../controllers/reviews.controller.js';

router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReview);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.editReview);
router.delete('/:id', reviewController.deleteReview);


export default router;