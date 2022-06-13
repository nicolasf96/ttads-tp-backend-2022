const storeController = {}
import Store from '../models/Store.js'


// curl http://localhost:3000/api/v1/stores/
//getAll
storeController.getStores = async (req, res) => {
    let stores = await Store.find().populate('products');
    return res.status(200).json({
        success: true,
        data: stores,
        message: 'Stores list retrieved successfully',
    })
};

// curl http://localhost:3000/api/v1/store/<id>
//getOne
storeController.getStore = async (req, res) => {
    let store = await Store.findOne({"_id":req.params.id});
    return res.status(200).json({
        success: true,
        data: store,
        message: 'Store found',
    })
};



//curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Juan", "lastName": "Perez", "email": "jp@gmail.com", "address": "undisclosed"}' http://localhost:3000/api/v1/client/
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
        data: req.params.body,
        message: 'Store edited successfully',
    })
};


//curl -X DELETE http://localhost:3000/api/v1/store/<id>
storeController.deleteStore =  async (req, res) => {
    await Store.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'Store removed successfully',
    })
};

export default storeController;