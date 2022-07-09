const imagesController = {}
import Image from '../models/Image.js';
import User from '../models/User.js'
import fs from 'fs'



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



imagesController.createImage = async (req,res) => {
    const { idUser } = req.body;
    let user = await User.findOne({"_id":idUser});

    const newImg = {
        title: 'Profile Picture - User: '+user.username,
        path: req.file.path,
        idUser: idUser
    }

    let img = await new Image(newImg);
    await img.save();

    user.profilePicture = req.file.filename;
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


export default imagesController;