const reviewController = {}
import Review from '../models/Review.js'
import Store from '../models/Store.js'


// curl http://localhost:3000/api/v1/reviews/
//getAll
reviewController.getReviews = async (req, res) => {
    let reviews = await Review.find().populate({path : 'user', populate : {path : 'profilePicture'}});
    return res.status(200).json({
        success: true,
        data: reviews,
        message: 'Categories list retrieved successfully',
    })
};



// curl http://localhost:3000/api/v1/reviews/<id>
//getOne
reviewController.getReview = async (req, res) => {
    let review = await Review.findOne({"_id":req.params.id}).populate({path : 'user', populate : {path : 'profilePicture'}});
    return res.status(200).json({
        success: true,
        data: review,
        message: 'Review found',
    })
};




//getOne
reviewController.getReviewsByStore = async (req, res) => {
    let reviews = await Review.find().where('store').equals(req.params.id)
    .populate({path : 'store', match: { _id: req.params.id }, populate : {path : 'profilePicture'}})
    .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();
    return res.status(200).json({
        success: true,
        data: reviews,
        message: 'Reviews list retrieved successfully',
    })
};

reviewController.getReviewsByUser = async (req, res) => {

    let reviews = await Review.find().where('user').equals(req.params.id)
    .populate({path : 'user', match: { _id: req.params.id }, populate : {path : 'profilePicture'}}).exec();
    return res.status(200).json({
        success: true,
        data: reviews,
        message: 'Reviews list retrieved successfully',
    })
};

reviewController.getReviewsByUserAndStore = async (req, res) => {

    let review = await Review.findOne({ $and: [{ store: req.params.idStore }, { user: req.params.idUser }] })
    .populate('store').populate({path : 'user', populate : {path : 'profilePicture'}}).exec();
    return res.status(200).json({
        success: true,
        data: review,
        message: 'Review retrieved successfully2',
    })
};



//new
reviewController.createReview = async (req, res) => {
    let review = await new Review(req.body);
    await review.save();

    let storeTmp = await Store.findOne(review.store);
    storeTmp.reviews.push(review);

    let promedio = (storeTmp.valoration + review.score)/2;
    storeTmp.valoration = promedio;
    await storeTmp.save();

    let store = await Store.findOne(review.store).populate({path : 'products', populate : {path : 'images'}})
    .populate('category').populate('profilePicture').populate('banner').populate('images')
    .populate({path : 'user', populate : {path : 'profilePicture'}})
    .exec();

    return res.status(200).json({
        success: true,
        data: {
            review,
            store
        },
        message: 'Review added successfully',
    })
};


reviewController.editReview = async (req,res) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
        success: true,
        data: review,
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