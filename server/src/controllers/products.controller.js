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
    let prod = await Product.findOne({"_id":req.params.id}).populate('images').populate({path : 'store', populate : [{path : 'profilePicture'},{path : 'category'}]}).exec();
                                            
    return res.status(200).json({
        success: true,
        data: prod,
        message: 'product found yes',
    })
};


//getOne
productController.getProductByStore = async (req, res) => {
    let products = await Product.find().where({"store": req.params.id}).populate('images').populate('store').exec();
    console.log(products);
    return res.status(200).json({
        success: true,
        data: products,
        message: 'product found',
    })
};



//new
productController.createProduct = async (req, res) => {
    let prod = await new Product(req.body);
    await prod.save();
    let store = await Store.findOne(prod.store).populate('products');
    store.products.push(prod);
    await store.save();
    return res.status(200).json({
        success: true,
        data: {
            prod
        },
        message: 'product added successfully',
    })
};


productController.editProduct = async (req,res) => {
    const theProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
        success: true,
        data: theProduct,
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