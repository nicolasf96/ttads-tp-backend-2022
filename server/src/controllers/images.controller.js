const imagesController = {}
import mongoose from 'mongoose';
import Image from '../models/Image.js';
import User from '../models/User.js';
import Store from '../models/Store.js';
import fs from 'fs'
const Product = mongoose.model('Product')


//getAll
imagesController.getImages = async (req, res) => {
    let images = await Image.find().populate('idUser');
    return res.status(200).json({
        success: true,
        data: images,
        message: 'Images list retrieved successfully',
    })
};



//getOne
imagesController.getImage = async (req, res) => {
    let img = await Image.findOne({"_id":req.params.id});
    return res.status(200).json({
        success: true,
        data: img,
        message: 'Image found',
    })
};



imagesController.createImageProfileUser = async (req,res) => {
    const { idUser } = req.body;
    let user = await User.findOne({"_id":idUser}).populate('profilePicture');


    if(user.profilePicture){
        await Image.findByIdAndRemove({"_id":user.profilePicture._id});
    }

    const newImg = {
        title: 'Profile Picture - User: '+user.username,
        path: req.file.path,
        idAssociated: idUser
    }

    let img = await new Image(newImg);
    await img.save();

    user.profilePicture = img._id;
    await user.save();


    console.log(newImg);
    console.log(user);

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
    let product = await Product.findOne({"_id":idProduct});

    const newImg = {
        title: 'Profile Picture - User: '+product.title,
        path: req.file.path,
        idAssociated: idProduct
    }

    let img = await new Image(newImg);
    await img.save();

    product.images.push(img._id);
    await product.save();

    return res.status(200).json({
        success: true,
        data: {
            product,
            img
        },
        message: 'Image added successfully',
    })  
}


imagesController.createImageProfileStore = async (req,res) => {
    const { idStore } = req.body;
    let store = await Store.findOne({"_id":idStore});


    if(store.profilePicture){
        await Image.findByIdAndRemove({"_id":store.profilePicture._id});
    }


    const newImg = {
        title: 'Profile Picture - Store: '+store.username,
        path: req.file.path,
        idAssociated: idStore
    }

    let img = await new Image(newImg);
    await img.save();

    store.profilePicture = img._id;
    await store.save();


    console.log(newImg);
    console.log(store);

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
    let store = await Store.findOne({"_id":idStore});

    const newImg = {
        title: 'Profile Picture - Store: '+store.username,
        path: req.file.path,
        idAssociated: idStore
    }

    let img = await new Image(newImg);
    await img.save();

    store.images.push(img._id);
    await store.save();


    console.log(newImg);
    console.log(store);

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
    let store = await Store.findOne({"_id":idStore});

    if(store.banner){
        await Image.findByIdAndRemove({"_id":sotre.banner._id});
    }

    const newImg = {
        title: 'Profile Picture - Store: '+store.username,
        path: req.file.path,
        idAssociated: idStore
    }

    let img = await new Image(newImg);
    await img.save();

    store.banner = img._id;
    await store.save();


    console.log(newImg);
    console.log(store);

    return res.status(200).json({
        success: true,
        data: {
            store,
            img
        },
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