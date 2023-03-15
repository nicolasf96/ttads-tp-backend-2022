const storeController = {}
import Store from '../models/Store.js'
import User from '../models/User.js'



// curl http://localhost:3000/api/v1/stores/
//getAll
storeController.getStoresWithImage = async (req, res) => {
    let stores = await Store.find().populate('profilePicture');
    return res.status(200).json({
        success: true,
        data: stores,
        message: 'Stores list retrieved successfully',
    })
};

storeController.getStoresWithLimit = async (req, res) => {
    let stores = await Store.find().populate('profilePicture').limit(req.params.limit);;
    return res.status(200).json({
        success: true,
        data: stores,
        message: 'Stores list retrieved successfully',
    })
};


//getAll
storeController.getStores = async (req, res) => {
    let stores = await Store.find().populate('profilePicture').populate('images')
    .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
    .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();

    return res.status(200).json({
        success: true,
        data: stores,
        message: 'Stores list retrieved successfully',
    })
};

//getOne
storeController.getStore = async (req, res) => {
    let store = await Store.findOne({"_id":req.params.id}).populate('profilePicture').populate('images')
    .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
    .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();
    return res.status(200).json({
        success: true,
        data: {
            store,
            "_id": req.params.id
        },
        message: 'Store found',
    })
};

storeController.getStoresByKeyword = async (req, res) => {
  let stores = await Store.find( { $or:[ {name: new RegExp(req.params.keyword, 'i') }, {tags: new RegExp(req.params.keyword, 'i') } ]})
  .populate('profilePicture').populate('images')
    .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
    .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();
    return res.status(200).json({
        success: true,
        data: stores,
        message: 'Stores found',
    })
};




//new
storeController.createStore = async (req, res) => {

    let storeTmp = await new Store(req.body);
    let userId = storeTmp.user
    let theUser = await User.findOne({"_id":userId}).populate('store');


    if(theUser.store){
        await Store.findByIdAndRemove({"_id":theUser.store._id});
    }

    await storeTmp.save();

    theUser.store = storeTmp._id;
    await theUser.save();

    let store = await Store.findOne({"_id":storeTmp._id}).populate('profilePicture').populate('images')
    .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
    .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();

    return res.status(200).json({
        success: true,
        data: store,
        message: 'Store added successfully',
    })
};


storeController.editStore = async (req,res) => {
    let storeTmp = await Store.findByIdAndUpdate(req.params.id, req.body);


    let store = await Store.findOne({"_id":storeTmp._id}).populate('profilePicture').populate('images')
    .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
    .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();

    return res.status(200).json({
        success: true,
        data: {
            store
        },
        message: 'Store edited successfully',
    })
};





storeController.deleteStore =  async (req, res) => {
    await Store.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'Store removed successfully',
    })
};

export default storeController;