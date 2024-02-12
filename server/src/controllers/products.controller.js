const productController = {}
import Product from '../models/product.js';
import Store from '../models/Store.js';



// * getAll
productController.getProducts = async (req, res) => {
    try {
        let products = await Product.find().populate('images').populate('store').exec();

        return res.status(200).json({
            success: true,
            data: products,
            message: 'Products list retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * getProductById
productController.getProductById = async (req, res) => {
    try {
        let product = await Product.findOne({ "_id": req.params.id }).populate('images')
            .populate({ path: 'store', populate: [{ path: 'profilePicture' }, { path: 'category' }] }).exec();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: 'Product found',
        });
    } catch (error) {
        console.error('Error getting product by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * getProductByStore
productController.getProductByStore = async (req, res) => {
    try {
        let products = await Product.find({ "store": req.params.id }).populate('images');

        return res.status(200).json({
            success: true,
            data: products,
            message: 'Products found for the store',
        });
    } catch (error) {
        console.error('Error getting products by store:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * createProduct
productController.createProduct = async (req, res) => {
    try {
        let product = await new Product(req.body).save();

        let storeTmp = await Store.findOne(product.store).populate('products');
        storeTmp.products.push(product);
        await storeTmp.save();

        let store = await Store.findOne(product.store).populate({ path: 'products', populate: { path: 'images' } })
            .populate('category').populate('profilePicture').populate('banner').populate('images')
            .populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        return res.status(201).json({
            success: true,
            data: {
                product,
                store
            },
            message: 'Product added successfully',
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * editProduct
productController.editProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        let store = await Store.findOne(product.store).populate({ path: 'products', populate: { path: 'images' } })
            .populate('category').populate('profilePicture').populate('banner').populate('images')
            .populate({ path: 'user', populate: { path: 'profilePicture' } }).exec();

        return res.status(200).json({
            success: true,
            data: {
                product,
                store
            },
            message: 'Product edited successfully',
        });
    } catch (error) {
        console.error('Error editing product:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * deleteProduct
productController.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findOne({ "_id": req.params.id });
        await Product.deleteOne({ "_id": req.params.id });
        let products = await Product.find({ "store": product.store }).populate('images');

        return res.status(200).json({
            success: true,
            data: {
                "_id": req.params.id,
                products
            },
            message: 'Product removed successfully',
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default productController;