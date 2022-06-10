const userController = {}
import User from '../models/User.js'


// curl http://localhost:3000/api/v1/user/
//getAll
userController.getUsers = async (req, res) => {
    let users = await User.find();
    return res.status(200).json({
        success: true,
        data: users,
        message: 'users list retrieved successfully',
    })
};

// curl http://localhost:3000/api/v1/client/<id>
//getOne
userController.getUser = async (req, res) => {
    let user = await User.findOne({"_id":req.params.id});
    return res.status(200).json({
        success: true,
        data: user,
        message: 'User found',
    })
};



//curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Juan", "lastName": "Perez", "email": "jp@gmail.com", "address": "undisclosed"}' http://localhost:3000/api/v1/client/
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
    const theUser = await User.findByIdAndUpdate(req.params.id, req.params.body);
    return res.status(200).json({
        success: true,
        data: theUser,
        message: 'User edited successfully',
    })
}


//curl -X DELETE http://localhost:3000/api/v1/client/<id>
userController.deleteUser =  async (req, res) => {
    await User.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'User removed successfully',
    })
};

export default userController;