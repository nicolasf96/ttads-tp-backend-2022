const imagesController = {}
import Image from '../models/Image.js';
import User from '../models/User.js'
import fs from 'fs'




imagesController.createImage = async (req,res) => {
    const { idUser, title } = req.body;
    const newImg = {
        title: title,
        path: req.file.filename,
        idUser: idUser
    }

    let img = await new Image(newImg);
    await img.save();

    let user = await User.findOne({"_id":idUser});
    user.profilePicture = req.file.filename;
    await user.save();


    console.log(newImg);
    console.log(user);

    return res.status(200).json({
        success: true,
        data: 'user',
        message: 'Image added successfully',
    })  
}


export default imagesController;