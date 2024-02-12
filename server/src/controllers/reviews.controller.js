const reviewController = {}
import Review from '../models/Review.js'
import Store from '../models/Store.js'


// curl http://localhost:3000/api/v1/reviews/
//* getAll
reviewController.getReviews = async (req, res) => {
    try {
        let reviews = await Review.find().populate({ path: 'user', populate: { path: 'profilePicture' } });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No reviews found',
            });
        }

        return res.status(200).json({
            success: true,
            data: reviews,
            message: 'Reviews list retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting reviews:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


// curl http://localhost:3000/api/v1/reviews/<id>
// * getOne
reviewController.getReview = async (req, res) => {
    try {
        let review = await Review.findOne({ "_id": req.params.id }).populate({ path: 'user', populate: { path: 'profilePicture' } });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: review,
            message: 'Review found',
        });
    } catch (error) {
        console.error('Error getting review:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * getOne
reviewController.getReviewsByStore = async (req, res) => {
    try {
        let reviews = await Review.find({ store: req.params.id })
            .populate({ path: 'store', match: { _id: req.params.id }, populate: { path: 'profilePicture' } })
            .populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No reviews found for the provided store',
            });
        }

        return res.status(200).json({
            success: true,
            data: reviews,
            message: 'Reviews list retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting reviews by store:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * get Reviews de un usuario
reviewController.getReviewsByUser = async (req, res) => {
    try {
        let reviews = await Review.find({ user: req.params.id })
            .populate({ path: 'user', match: { _id: req.params.id }, populate: { path: 'profilePicture' } }).exec();

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No reviews found for the provided user',
            });
        }

        return res.status(200).json({
            success: true,
            data: reviews,
            message: 'Reviews list retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting reviews by user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * getReviewsByUserAndStore
reviewController.getReviewsByUserAndStore = async (req, res) => {
    try {
        let review = await Review.findOne({ $and: [{ store: req.params.idStore }, { user: req.params.idUser }] })
            .populate('store').populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found for the provided store and user',
            });
        }

        return res.status(200).json({
            success: true,
            data: review,
            message: 'Review retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting review by user and store:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * create Review
reviewController.createReview = async (req, res) => {
    try {
        let review = await new Review(req.body).save();

        let storeTmp = await Store.findOne(review.store);
        storeTmp.reviews.push(review);

        let val = storeTmp.valoration || 0;
        let promedio = (val + review.score) / 2;
        storeTmp.valoration = promedio;
        await storeTmp.save();

        let store = await Store.findOne(review.store)
            .populate({ path: 'products', populate: { path: 'images' } })
            .populate('category').populate('profilePicture').populate('banner').populate('images')
            .populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        return res.status(201).json({
            success: true,
            data: {
                review,
                store
            },
            message: 'Review added successfully',
        });
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * editReview
reviewController.editReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: review,
            message: 'Review edited successfully',
        });
    } catch (error) {
        console.error('Error editing review:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * deleteReview
reviewController.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.deleteOne({ "_id": req.params.id });

        if (deletedReview.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: { "_id": req.params.id },
            message: 'Review removed successfully',
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default reviewController;