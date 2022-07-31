const productController = {}
import Product from '../models/product.js';
import Store from '../models/Store.js';


// curl http://localhost:3000/api/v1/product/
//getAll
productController.getProducts = async (req, res) => {
    let products = await Product.find().populate('images');
    return res.status(200).json({
        success: true,
        data: products,
        message: 'Products list retrieved successfully',
    })
};

// curl http://localhost:3000/api/v1/product/<id>
//getOne
productController.getProductById = async (req, res) => {
    let prod = await Product.findOne({"_id":req.params.id}).populate('images');
    return res.status(200).json({
        success: true,
        data: prod,
        message: 'product found yes',
    })
};

// curl http://localhost:3000/api/v1/products/<id>
//getOne
productController.getProductByStore = async (req, res) => {
    let products = await Product.find().where({"idStore": req.params.id}).populate('images');
    console.log(products);
    return res.status(200).json({
        success: true,
        data: products,
        message: 'product found',
    })
};



//curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Juan", "lastName": "Perez", "email": "jp@gmail.com", "address": "undisclosed"}' http://localhost:3000/api/v1/products/
//new
productController.createProduct = async (req, res) => {
    let prod = await new Product(req.body);
    await prod.save();
    let store = await Store.findOne({"_id":req.body.idStore}).populate('products');
    store.products.push(prod);
    await store.save();
    return res.status(200).json({
        success: true,
        data: {
            store
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


//curl -X DELETE http://localhost:3000/api/v1/products/<id>
productController.deleteProduct =  async (req, res) => {
    await Product.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'product removed successfully',
    })
};

export default productController;