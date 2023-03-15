const imagesController = {}
import mongoose from 'mongoose';
import Image from '../models/Image.js';
import User from '../models/User.js';
import Store from '../models/Store.js';
import fs from 'fs'
const Product = mongoose.model('Product')


//getAll
imagesController.getImages = async (req, res) => {
    let images = await Image.find().populate('idAssociated');
    return res.status(200).json({
        success: true,
        data: images,
        message: 'Images list retrieved successfully',
    })
};



//getOne
imagesController.getImage = async (req, res) => {
    let image = await Image.findOne({"_id":req.params.id}).populate('idAssociated');
    return res.status(200).json({
        success: true,
        data: image,
        message: 'Image found',
    })
};



imagesController.createImageProfileUser = async (req,res) => {
    const { idUser } = req.body;
    let userTmp = await User.findOne({"_id":idUser}).populate('profilePicture');


    if(userTmp.profilePicture){
        await Image.findByIdAndRemove({"_id":userTmp.profilePicture._id});
    }

    const newImg = {
        title: 'Profile Picture of user '+userTmp.username,
        path: req.file.path,
        idAssociated: idUser
    }

    let img = await new Image(newImg);
    await img.save();

    userTmp.profilePicture = img._id;
    await userTmp.save();

    let user = await User.findOne({"_id":idUser}).populate('profilePicture').populate('store').exec();

    return res.status(200).json({
        success: true,
        data: {
            user,
            img
        },
        message: 'Image added successfully',
    })  
}

imagesController.createImageProduct = async (req,res) => {
    const { idProduct } = req.body;
    let productTmp = await Product.findOne({"_id":idProduct});

    const newImg = {
        title: 'profile Picture of '+productTmp.title,
        path: req.file.path,
        idAssociated: idProduct
    }

    let img = await new Image(newImg);
    await img.save();

    productTmp.images.push(img._id);
    await productTmp.save();

    let product = await Product.findOne({"_id":idProduct}).populate('images');
    let products = await Product.find().where({"store": product.store}).populate('images');

    return res.status(200).json({
        success: true,
        data: {
            products,
            product,
            img
        },
        message: 'Image added successfully',
    })  
}


imagesController.createImageProfileStore = async (req,res) => {
    const { idStore } = req.body;
    let storeTmp = await Store.findOne({"_id":idStore}).populate('profilePicture').populate('images').
    populate('products').populate('category').populate('banner').populate('reviews').populate('user').
    exec();


    if(storeTmp.profilePicture){
        await Image.findByIdAndRemove({"_id":storeTmp.profilePicture._id});
    }


    const newImg = {
        title: 'Profile Picture - Store: '+storeTmp.username,
        path: req.file.path,
        idAssociated: idStore
    }

    let img = await new Image(newImg);
    await img.save();

    storeTmp.profilePicture = img._id;
    await storeTmp.save();

    let store = await Store.findOne({"_id":idStore}).populate('profilePicture').populate('images').
    populate('products').populate('category').populate('banner').populate('reviews').populate('user').
    exec();


    return res.status(200).json({
        success: true,
        data: {
            store,
            img
        },
        message: 'Image added successfully',
    })  
}


imagesController.createImageStore = async (req,res) => {
    const { idStore } = req.body;
    let storeTmp = await Store.findOne({"_id":idStore});

    const newImg = {
        title: 'Profile Picture - Store: '+storeTmp.username,
        path: req.file.path,
        idAssociated: idStore
    }

    let img = await new Image(newImg);
    await img.save();

    storeTmp.images.push(img._id);
    await storeTmp.save();

    let store = await Store.findOne({"_id":idStore}).populate('profilePicture').populate('images').
    populate('products').populate('category').populate('banner').populate('reviews').populate('user').
    exec();


    return res.status(200).json({
        success: true,
        data: {
            store,
            img
        },
        message: 'Image added successfully',
    })  
}

imagesController.createBannerStore = async (req,res) => {
    const { idStore } = req.body;
    let storeTmp = await Store.findOne({"_id":idStore}).populate('profilePicture').populate('images').
    populate('products').populate('category').populate('banner').populate('reviews').populate('user').
    exec();

    if(storeTmp.banner){
        await Image.findByIdAndRemove({"_id":storeTmp.banner._id});
    }

    const newImg = {
        title: 'profile picture of '+storeTmp.username,
        path: req.file.path,
        idAssociated: idStore
    }

    let img = await new Image(newImg);
    await img.save();

    storeTmp.banner = img._id;
    await storeTmp.save();

    let store = await Store.findOne({"_id":idStore}).populate('profilePicture').populate('images').
    populate('products').populate('category').populate('banner').populate('reviews').populate('user').
    exec();

    return res.status(200).json({
        success: true,
        data: store,
        message: 'Image added successfully',
    })  
}


imagesController.deleteImage =  async (req, res) => {
    
    await Image.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'Image removed successfully',
    })
};

export default imagesController;