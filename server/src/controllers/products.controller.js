const productController = {}
import Product from '../models/product.js';
import Store from '../models/Store.js';



//getAll
productController.getProducts = async (req, res) => {
    let products = await Product.find().populate('images').populate('store').exec();
    return res.status(200).json({
        success: true,
        data: products,
        message: 'Products list retrieved successfully',
    })
};


//getOne
productController.getProductById = async (req, res) => {
    let product = await Product.findOne({"_id":req.params.id}).populate('images').populate({path : 'store',
    populate : [{path : 'profilePicture'},{path : 'category'}]}).exec();
                                            
    return res.status(200).json({
        success: true,
        data: product,
        message: 'product found yes',
    })
};


//getOne
productController.getProductByStore = async (req, res) => {
    let products = await Product.find().where({"store": req.params.id}).populate('images');
    // .populate({path : 'store', populate : [{path : 'profilePicture'},{path : 'category'}]}).exec();
    return res.status(200).json({
        success: true,
        data: products,
        message: 'product found',
    })
};



//new
productController.createProduct = async (req, res) => {
    let product = await new Product(req.body);
    await product.save();
    
    //buscamos el Store y le guardo su prod nuevo
    let storeTmp = await Store.findOne(product.store).populate('products');
    storeTmp.products.push(product);
    await storeTmp.save();
    
    
    //Buscamos nuevamente la store actualizada para devolver
    let store = await Store.findOne(product.store).populate({path : 'products', populate : {path : 'images'}})
    .populate('category').populate('profilePicture').populate('banner').populate('images')
    .populate({path : 'user', populate : {path : 'profilePicture'}})
    .exec();


    return res.status(200).json({
        success: true,
        data: {
            product,
            store
        },
        message: 'product added successfully',
    })
};


productController.editProduct = async (req,res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);


    let store = await Store.findOne(product.store).populate({path : 'products', populate : {path : 'images'}})
    .populate('category').populate('profilePicture').populate('banner').populate('images')
    .populate({path : 'user', populate : {path : 'profilePicture'}})
    .exec();


    return res.status(200).json({
        success: true,
        data: {
            product,
            store
        },
        message: 'product edited successfully',
    })
}


productController.deleteProduct =  async (req, res) => {
    await Product.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'product removed successfully',
    })
};

export default productController;