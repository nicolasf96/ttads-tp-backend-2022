const storeController = {}
import Store from '../models/Store.js'
import User from '../models/User.js'



// curl http://localhost:3000/api/v1/stores/
//getAll
// TODO Refactor : Eliminar este método (no tiene sentido)
storeController.getStoresWithImage = async (req, res) => {
    try{
        let stores = await Store.find().populate('profilePicture');

        if (!stores || stores.length === 0) {
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


// Todo Refactor: Mejorar el método para traer las mas populares, o las que tengan mayor puntuación
storeController.getStoresWithLimit = async (req, res) => {
    try {
        const stores = await Store.find().populate('profilePicture').populate('category').sort({ createdAt: -1 }).limit(6);
        
        if (!stores || stores.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No stores found',
            });
        }
        
        return res.status(200).json({
            success: true,
            data: stores,
            message: 'Stores list retrieved successfully',
        });
    } catch (error) {
        console.error('Error fetching stores:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// *Searching Stores
// Todo Refactor: Encontrar la manera de buscar filtrando sin tener que traer todas las stores
storeController.searchStores = async (req, res) => {
    try {
        const keyword = req.params.search;
        const regex = new RegExp(keyword, 'i'); // Expresión regular insensible a mayúsculas y minúsculas
    
        // Realizar la búsqueda después de popular los campos
        let stores = await Store.find({})
            .populate('profilePicture')
            .populate('images')
            .populate({ path: 'products', populate: { path: 'images' } })
            .populate('category')
            .populate('banner')
            .populate('reviews')
            .populate({ path: 'user', populate: { path: 'profilePicture' } })
            .lean();
        
        // Filtrar los resultados basados en la keyword
        stores = stores.filter(store => {
            return store.name.match(regex) ||
                store.username.match(regex) ||
                store.description.match(regex) ||
                (store.category && store.category.description.match(regex));
        });

        console.log('STORES2: ',stores);
    
        return res.status(200).json({
          success: true,
          data: stores,
          message: 'Stores found by keyword',
        });
      } catch (error) {
        console.error('Error searching stores by keyword:', error);
        return res.status(500).json({
          success: false,
          message: 'Error searching stores by keyword',
          error: error.message,
        });
      }
};

// * getAll
storeController.getStores = async (req, res) => {
    try{
        let stores = await Store.find().populate('profilePicture').populate('images')
        .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
        .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();

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
        let store = await Store.findOne({"_id":req.params.id}).populate('profilePicture').populate('images')
        .populate({path : 'products', populate : {path : 'images'}}).populate('category').populate('banner').populate('reviews')
        .populate({path : 'user', populate : {path : 'profilePicture'}}).exec();

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


//  * Busqueda de Stores por keyword
storeController.getStoresByKeyword = async (req, res) => {
    try {
        let stores = await Store.find({
            $or: [
                { name: new RegExp(req.params.keyword, 'i') },
                { tags: new RegExp(req.params.keyword, 'i') }
            ]
        }).populate('profilePicture').populate('images')
            .populate({ path: 'products', populate: { path: 'images' } })
            .populate('category').populate('banner').populate('reviews')
            .populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        if (stores && stores.length > 0) {
            return res.status(200).json({
                success: true,
                data: stores,
                message: 'Stores found',
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'No stores found for the provided keyword',
            });
        }
    } catch (error) {
        console.error('Error getting stores by keyword:', error);
        return res.status(500).json({
            success: false,
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
        let storeTmp = await Store.findByIdAndUpdate(req.params.id, req.body);

        if (!storeTmp) {
            return res.status(404).json({
                success: false,
                message: 'Store not found',
            });
        }

        let store = await Store.findOne({ "_id": storeTmp._id }).populate('profilePicture').populate('images')
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
        const deletedStore = await Store.deleteOne({ "_id": req.params.id });

        if (deletedStore.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Store not found',
            });
        }

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