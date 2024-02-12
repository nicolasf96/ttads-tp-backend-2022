const imagesController = {}
import mongoose from 'mongoose';
import Image from '../models/Image.js';
import User from '../models/User.js';
import Store from '../models/Store.js';
import fs from 'fs'
const Product = mongoose.model('Product')


// * getAll
imagesController.getImages = async (req, res) => {
    try {
        let images = await Image.find().populate('idAssociated');

        return res.status(200).json({
            success: true,
            data: images,
            message: 'Images list retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting images:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * get Imagen
imagesController.getImage = async (req, res) => {
    try {
        let image = await Image.findOne({ "_id": req.params.id }).populate('idAssociated');

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: image,
            message: 'Image found',
        });
    } catch (error) {
        console.error('Error getting image:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * create Imagen de Perfil de Usuario
imagesController.createImageProfileUser = async (req, res) => {
    try {
        const { idUser } = req.body;
        let userTmp = await User.findOne({ "_id": idUser }).populate('profilePicture');

        if (userTmp.profilePicture) {
            await Image.findByIdAndRemove({ "_id": userTmp.profilePicture._id });
        }

        const newImg = {
            title: 'Profile Picture of user ' + userTmp.username,
            path: req.file.path,
            idAssociated: idUser
        }

        let img = await new Image(newImg).save();

        userTmp.profilePicture = img._id;
        await userTmp.save();

        let user = await User.findOne({ "_id": idUser }).populate('profilePicture').populate('store').exec();

        return res.status(201).json({
            success: true,
            data: {
                user,
                img
            },
            message: 'Image added successfully',
        });
    } catch (error) {
        console.error('Error creating profile image for user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * create Imagen de Producto
imagesController.createImageProduct = async (req, res) => {
    try {
        const { idProduct } = req.body;
        let productTmp = await Product.findOne({ "_id": idProduct });

        if (!productTmp) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        const newImg = {
            title: 'Profile Picture of ' + productTmp.title,
            path: req.file.path,
            idAssociated: idProduct
        };

        let img = await new Image(newImg).save();
        productTmp.images.push(img._id);
        await productTmp.save();

        let product = await Product.findOne({ "_id": idProduct }).populate('images');
        let products = await Product.find({ "store": product.store }).populate('images');

        return res.status(201).json({
            success: true,
            data: {
                products,
                product,
                img
            },
            message: 'Image added successfully',
        });
    } catch (error) {
        console.error('Error creating product image:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * create Imagen de perfil de Store
imagesController.createImageProfileStore = async (req, res) => {
    try {
        const { idStore } = req.body;
        let storeTmp = await Store.findOne({ "_id": idStore }).populate('profilePicture').populate('images')
            .populate('products').populate('category').populate('banner').populate('reviews').populate('user');

        if (!storeTmp) {
            return res.status(404).json({
                success: false,
                message: 'Store not found',
            });
        }

        if (storeTmp.profilePicture) {
            await Image.findByIdAndRemove({ "_id": storeTmp.profilePicture._id });
        }

        const newImg = {
            title: 'Profile Picture - Store: ' + storeTmp.username,
            path: req.file.path,
            idAssociated: idStore
        };

        let img = await new Image(newImg).save();
        storeTmp.profilePicture = img._id;
        await storeTmp.save();

        let store = await Store.findOne({ "_id": idStore }).populate('profilePicture').populate('images')
            .populate('products').populate('category').populate('banner').populate('reviews').populate('user');

        return res.status(201).json({
            success: true,
            data: {
                store,
                img
            },
            message: 'Image added successfully',
        });
    } catch (error) {
        console.error('Error creating store profile image:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * create Imagen de Store
imagesController.createImageStore = async (req, res) => {
    try {
        const { idStore } = req.body;
        let storeTmp = await Store.findOne({ "_id": idStore });

        if (!storeTmp) {
            return res.status(404).json({
                success: false,
                message: 'Store not found',
            });
        }

        const newImg = {
            title: 'Profile Picture - Store: ' + storeTmp.username,
            path: req.file.path,
            idAssociated: idStore
        };

        let img = await new Image(newImg).save();
        storeTmp.images.push(img._id);
        await storeTmp.save();

        let store = await Store.findOne({ "_id": idStore }).populate('profilePicture').populate('images')
            .populate('products').populate('category').populate('banner').populate('reviews').populate('user');

        return res.status(201).json({
            success: true,
            data: {
                store,
                img
            },
            message: 'Image added successfully',
        });
    } catch (error) {
        console.error('Error creating store image:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//  * create Banner de Store
imagesController.createBannerStore = async (req, res) => {
    try {
        const { idStore } = req.body;
        let storeTmp = await Store.findOne({ "_id": idStore }).populate('profilePicture').populate('images')
            .populate('products').populate('category').populate('banner').populate('reviews').populate('user');

        if (!storeTmp) {
            return res.status(404).json({
                success: false,
                message: 'Store not found',
            });
        }

        if (storeTmp.banner) {
            await Image.findByIdAndRemove({ "_id": storeTmp.banner._id });
        }

        const newImg = {
            title: 'Profile Picture - Store: ' + storeTmp.username,
            path: req.file.path,
            idAssociated: idStore
        };

        let img = await new Image(newImg).save();
        storeTmp.banner = img._id;
        await storeTmp.save();

        let store = await Store.findOne({ "_id": idStore }).populate('profilePicture').populate('images')
            .populate('products').populate('category').populate('banner').populate('reviews').populate('user');

        return res.status(201).json({
            success: true,
            data: store,
            message: 'Image added successfully',
        });
    } catch (error) {
        console.error('Error creating store banner image:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//  * delete Imagen
imagesController.deleteImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        
        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }

        await image.remove();
        
        return res.status(200).json({
            success: true,
            data: { "_id": req.params.id },
            message: 'Image removed successfully',
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default imagesController;