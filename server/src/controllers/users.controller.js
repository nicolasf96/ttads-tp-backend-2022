const userController = {}
import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


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
    .populate({path : 'store', populate : [{path : 'profilePicture'},{path : 'category'},{path : 'images'},{path : 'banner'},{path : 'products', populate : [{path : 'images'}]}]});
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
    let { firstName, lastName, email, password, username, phone } = req.body;
    let newUser = await new User();

    if(firstName && lastName && email && password && username && phone){
         newUser.firstName = firstName;
         newUser.lastName = lastName;
         newUser.email = email;
         newUser.username = username;
         newUser.phone = phone;
         newUser.profilePicture = null;


         User.find({
            $or: [{email: newUser.email.toLocaleLowerCase()},
                  {username: newUser.username.toLocaleLowerCase()}]
         }).exec((err, users)=>{
            if(err) return res.status(500).json({ message: "Error al guardar usuario"})
            if(users && users.length >=1){
                return res.status(300).json({ message: "El usuario que intentas registrar ya existe!"})
            }else{
                bcrypt.hash(password, 10, async function(err, hash) {
                    newUser.password = hash;
        
                    await newUser.save((err, userStored)=>{
                        if(err) return res.status(500).json({ message: "Error al guardar usuario"})
        
                        if(userStored) {
                            let token = jwt.sign({'_id' : userStored._id}, 'secretKey')
                            return res.status(200).json({ 
                                success: true,
                                token,
                                _id: user._id,
                                message: 'Sign Up Succesfully',})

                        }
                        else{
                            return res.status(404).json({ message: "No se guardó el usuario"})
                        }
                    })
                 })
            }
         });

         
    }
    else{
        return res.status(200).json({
            message: 'Completa todos los campos!',
        })  
    }
    
};


userController.loginUser = async (req,res) => {
    let params = req.body;
    let username = params.username;
    let password = params.password;

    User.findOne({ username: username}, async (err,user)=>{
        if(err) return res.status(500).json({ message: "Error en la petición"})

        if(user) {
            let match = await bcrypt.compare(password, user.password);
            if (match) {

                    let token = jwt.sign({'_id' : user._id}, 'secretKey')
                    return res.status(200).json({ 
                        success: true,
                        token,
                        _id: user._id,
                        message: 'Login Succesfully',})

                
            }else{
                return res.status(404).json({ message: "Usuario y/o contraseña incorrectos"})
            }
        }
        else{
            return res.status(404).json({ message: "El usuario no se ha podido identificar"})
        }

    }).clone().exec()



}




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




