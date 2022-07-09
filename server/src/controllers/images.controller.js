const imagesController = {}
import Image from '../models/Image.js';
import fs from 'fs'




imagesController.createImage = async (req,res) => {
    const img = fs.readFileSync(req.file.path);
    const encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
     
    const finalImg = {
        img: {
            data:  new Buffer(encode_image, 'base64'),
            contentType: req.file.mimetype
        },
        idUser: req.params.id
        };
    
    console.log("controller!!!!! "+imageTmp)
    let image = await new Image(imageTmp);
    await image.save();
    return res.status(200).json({
        success: true,
        data: user,
        message: 'User added successfully',
    })  
}


export default imagesController;