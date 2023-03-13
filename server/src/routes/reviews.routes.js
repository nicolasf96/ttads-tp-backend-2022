import Router from 'express';
const router = Router();
import reviewController from '../controllers/reviews.controller.js';

router.get('/reviews', reviewController.getReviews);
router.get('/review/:id', reviewController.getReview);
router.get('/reviews/:id', reviewController.getReviewsByStore);
router.get('/reviewsByUser/:id', reviewController.getReviewsByUser);
router.get('/reviewsByUserAndStore/:idUser/:idStore', reviewController.getReviewsByUserAndStore);
router.post('/review', reviewController.createReview);
router.put('/review/:id', reviewController.editReview);
router.delete('/review/:id', reviewController.deleteReview);


export default router;