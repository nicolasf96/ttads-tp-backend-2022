const userController = {}
import User from '../models/User.js'


//getAll
userController.getUsers = async (req, res) => {
    let users = await User.find().populate('profilePicture').populate('store').exec();
    return res.status(200).json({
        success: true,
        data: users,
        message: 'users list retrieved successfully',
    })
};

//getOne
userController.getUser = async (req, res) => {
    let user = await User.findOne({"_id":req.params.id}).populate('profilePicture')
    .populate({path : 'store', populate : [{path : 'profilePicture'},{path : 'category'}]});
    return res.status(200).json({
        success: true,
        data: user,
        message: 'User found',
    })
};

userController.getUserByStore = async (req, res) => {
    let user = await User.findOne({"store":req.params.id}).populate('profilePicture');
    return res.status(200).json({
        success: true,
        data: user,
        message: 'User found',
    })
};





//new
userController.createUser = async (req, res) => {
    let user = await new User(req.body);
    await user.save();
    return res.status(200).json({
        success: true,
        data: user,
        message: 'User added successfully',
    })  
};




userController.editUser = async (req,res) => {
    const theUser = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
        success: true,
        data: theUser,
        message: 'User edited successfully',
    })
}


userController.deleteUser =  async (req, res) => {
    await User.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'User removed successfully',
    })
};

export default userController;