const storeController = {}
import Store from '../models/Store.js'
import Category from '../models/Category.js'
import User from '../models/User.js'
import Mongoose from 'mongoose';
import paginationParseParams from '../resources/index.js'



// * getAll
storeController.getAllStores = async (req, res) => {
    try{

        const stores = await Store.find().populate('profilePicture').populate('images')
        .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
        .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();

        // let stores = await Store.find().populate('profilePicture').populate('images')
        // .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
        // .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();

        if(!stores || stores.lenght === 0){
            return res.status(404).json({
                success: false,
                message: 'No stores found',
            });
        }

        return res.status(200).json({
            success: true,
            data: stores,
            message: 'Stores list retrieved successfully',
        })

    }catch(error){
        console.error('Error getting stores:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * getAll
storeController.getStores = async (req, res) => {
    try{

        let options = {
            sort: { date: -1 },
            populate: [{
                path: 'profilePicture'
            },
            {
                path: 'images'
            },
            {
                path: 'products',
                populate: {
                    path: 'images'
                }
            },
            {
                path: 'category'
            },
            {
                path: 'banner'
            },
            {
                path: 'reviews'
            },
            {
                path: 'user',
                populate: {
                    path: 'profilePicture'
                }
            },],
            page: 1,
            limit: 12,
          };
        const { query = {}} = req;
        const { limit , page } = paginationParseParams(query);
        const { busqueda = '', categoriaID = '' } = req.query;

        if(limit){
            options.limit = limit;
        }
        if(page){
            options.page = page; 
        }

        let match
        if(!categoriaID){
            match = { 
                $and: [
                    {
                        $or: [
                            { name: { $regex: new RegExp(busqueda, "i") } },
                            { description: { $regex: new RegExp(busqueda, "i") } }
                        ]
                    },
                    {
                        blocked: { $ne: true }
                    }
                ]
            }

        }else{
            match = {
                $and: [
                  {
                    $or: [
                      { name: { $regex: new RegExp(busqueda, "i") } },
                      { description: { $regex: new RegExp(busqueda, "i") } }
                    ]
                  },
                  { category: categoriaID }, // Agrega la búsqueda por categoría aquí
                  { blocked: { $ne: true } }
                ]
              }
            
        }
        
        const stores = await Store.paginate(match, options);


        if(!stores || stores.lenght === 0){
            return res.status(404).json({
                success: false,
                message: 'No stores found',
            });
        }

        return res.status(200).json({
            success: true,
            data: stores,
            message: 'Stores list retrieved successfully',
        })

    }catch(error){
        console.error('Error getting stores:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//* getOne
storeController.getStore = async (req, res) => {
    try {
        let store = await Store.findOne({"_id":req.params.id})
        .populate('profilePicture')
        .populate('images')
        .populate({path : 'products', populate : {path : 'images'}})
        .populate('category').populate('banner')
        .populate('reviews')
        .populate({path : 'user', populate : {path : 'profilePicture'}})
        .exec();

        if(!store){
            return res.status(404).json({
                success: false,
                data: null,
                message: 'No store found'
            });
        }

        return res.status(200).json({
            success: true,
            data: store,
            message: 'Store retrieved successfully'
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
        });
    }
};


// * new Store
storeController.createStore = async (req, res) => {
    try {

        let storeTmp = new Store(req.body);
        let userId = storeTmp.user;
        let theUser = await User.findOne({ "_id": userId }).populate('store');

        if (theUser.store) {
            await Store.findByIdAndRemove({ "_id": theUser.store._id });
        }

        // Verificar si el email o el username ya están en uso
        const stores = await Store.find({
            $or: [{ username: req.body.username }]
        });
        if (stores.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'El username de la tienda ya se encuentra registrado',
            });
        }

        await storeTmp.save();

        theUser.store = storeTmp._id;
        await theUser.save();

        let store = await Store.findOne({ "_id": storeTmp._id }).populate('profilePicture').populate('images')
            .populate({ path: 'products', populate: { path: 'images' } }).populate('category').populate('banner').populate('reviews')
            .populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        return res.status(201).json({
            success: true,
            data: store,
            message: 'Store created successfully',
        });
    } catch (error) {
        console.error('Error creating store:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * edit Store
storeController.editStore = async (req, res) => {
    try {
        console.log(req.body);
        let storeTmp = await Store.findById(req.params.id);
        if (!storeTmp) {
            return res.status(404).json({
                success: false,
                message: 'Store not found',
            });
        }
        // Verificar si el email o el username ya están en uso
        const stores = await Store.find({
            $or: [{ username: req.body.username }],
            _id: { $ne: req.params.id } // Excluir la tienda actual
        });
        console.log('STORES:',stores);

        if (stores.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'El username de la tienda ya se encuentra registrado',
            });
        }
        
        await Store.findByIdAndUpdate(req.params.id, req.body);
        
        let store = await Store.findById(req.params.id).populate('profilePicture').populate('images')
            .populate({ path: 'products', populate: { path: 'images' } }).populate('category').populate('banner').populate('reviews')
            .populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        return res.status(200).json({
            success: true,
            data: store,
            message: 'Store edited successfully',
        });
    } catch (error) {
        console.error('Error editing store:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//  * Delete Store
storeController.deleteStore = async (req, res) => {
    try {

        Store.findById(req.params.id, async function(err,s){
            if(err){
                return res.status(404).json({
                    success: false,
                    message: 'Tienda no encontrada',
                });
            }else{
                s.remove()
            }
        });

        return res.status(200).json({
            success: true,
            data: { "_id": req.params.id },
            message: 'Store removed successfully',
        });
    } catch (error) {
        console.error('Error deleting store:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


export default storeController;