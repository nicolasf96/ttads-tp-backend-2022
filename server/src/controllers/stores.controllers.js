const storeController = {}
import Store from '../models/Store.js'



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

//getAll
storeController.getStores = async (req, res) => {
    let stores = await Store.find().populate('products').populate('user');
    return res.status(200).json({
        success: true,
        data: stores,
        message: 'Stores list retrieved successfully',
    })
};

//getOne
storeController.getStore = async (req, res) => {
    let store = await Store.findOne({"_id":req.params.id}).populate('profilePicture').populate('images').
    populate('products').populate('category').populate('banner').populate('reviews').populate('user').
    exec();
    return res.status(200).json({
        success: true,
        data: store,
        message: 'Store found',
    })
};

storeController.getStoresByKeyword = async (req, res) => {
  let stores = await Store.find( { $or:[ {name: new RegExp(req.params.keyword, 'i') }, {tags: new RegExp(req.params.keyword, 'i') } ]}).populate('profilePicture');
    console.log(stores);
    return res.status(200).json({
        success: true,
        data: stores,
        message: 'Stores found',
    })
};




//new
storeController.createStore = async (req, res) => {
    let store = await new Store(req.body);
    await store.save();
    return res.status(200).json({
        success: true,
        data: store,
        message: 'Store added successfully',
    })
};


storeController.editStore = async (req,res) => {
    let theStore = await Store.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
        success: true,
        data: [req.params.body, theStore],
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