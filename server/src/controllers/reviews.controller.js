const reviewController = {}
import Review from '../models/Review.js'
import Store from '../models/Store.js'


// curl http://localhost:3000/api/v1/reviews/
//getAll
reviewController.getReviews = async (req, res) => {
    let reviews = await Review.find();
    return res.status(200).json({
        success: true,
        data: reviews,
        message: 'Categories list retrieved successfully',
    })
};

// curl http://localhost:3000/api/v1/reviews/<id>
//getOne
reviewController.getReview = async (req, res) => {
    let review = await Review.findOne({"_id":req.params.id});
    return res.status(200).json({
        success: true,
        data: review,
        message: 'Review found',
    })
};




//getOne
reviewController.getReviewsByStore = async (req, res) => {
    let reviews = await Review.find().where('idStore').equals(req.params.id).
    populate({path : 'user', populate : {path : 'profilePicture'}}).exec();
    return res.status(200).json({
        success: true,
        data: reviews,
        message: 'Categories list retrieved successfully',
    })
};



//new
reviewController.createReview = async (req, res) => {
    let review = await new Review(req.body);
    await review.save();
    let store = await Store.findOne({"_id":review.idStore});
    store.reviews.push(review);

    let prom = (store.valoration + review.score)/2;

    store.valoration = prom;

    await store.save();
    return res.status(200).json({
        success: true,
        data: review,
        message: 'Review added successfully',
    })
};


reviewController.editReview = async (req,res) => {
    const theReview = await Review.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
        success: true,
        data: theReview,
        message: 'Review edited successfully',
    })
}


reviewController.deleteReview =  async (req, res) => {
    await Review.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'Review removed successfully',
    })
};

export default reviewController;