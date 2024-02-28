const userController = {}
import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


// * getAll
userController.getUsers = async (req, res) => {
    try {
        let users = await User.find().populate('profilePicture')
            .populate({path : 'store', populate : [{path : 'images'}, {path : 'profilePicture'}, {path: 'banner'}, {path: 'category'}, {path: 'products'}]})
            .exec();

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found',
            });
        }

        return res.status(200).json({
            success: true,
            data: users,
            message: 'Users list retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting users:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * getOne
userController.getUser = async (req, res) => {
    try {
        let user = await User.findOne({"_id": req.params.id}).populate('profilePicture')
            .populate({
                path: 'store',
                populate: [
                    {path: 'profilePicture'},
                    {path: 'category'},
                    {path: 'images'},
                    {path: 'banner'},
                    {path: 'products', populate: [{path: 'images'}]}
                ]
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: 'User found',
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * GetUser by Store
userController.getUserByStore = async (req, res) => {
    try {
        let user = await User.findOne({"store": req.params.id}).populate('profilePicture');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found for this store',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: 'User found',
        });
    } catch (error) {
        console.error('Error fetching user by store:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * createUser (registro)
userController.createUser = async (req, res) => {
    try {
        let { firstName, lastName, email, password, username, phone } = req.body;

        if (firstName && lastName && email && password && username && phone) {
            let existingUser = await User.findOne({
                $or: [
                    { email: email.toLowerCase() },
                    { username: username.toLowerCase() }
                ]
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'El usuario que intentas registrar ya existe',
                });
            }

            const newUser = new User({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password,
                username: username.toLowerCase(),
                phone,
                profilePicture: null
            });

            bcrypt.hash(password, 10, async function (err, hash) {
                newUser.password = hash;
                await newUser.save();

                let token = jwt.sign({ '_id': newUser._id }, 'secretKey');

                return res.status(201).json({
                    success: true,
                    token,
                    _id: newUser._id,
                    userStored: newUser,
                    message: 'Registro exitoso',
                });
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Completa todos los campos',
            });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
};

// * Login
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
                        role: user.role,
                        message: 'Login Succesfully',})

                
            }else{
                return res.status(401).json({ message: "Usuario y/o contraseña incorrectos"})
            }
        }
        else{
            return res.status(404).json({ message: "El usuario no se ha podido identificar"})
        }

    }).clone().exec()



}

// * Edit User
userController.editUser = async (req, res) => {
    try {
        const userTmp = await User.findByIdAndUpdate(req.params.id, req.body);

        const user = await User.findOne({ "_id": req.params.id }).populate('profilePicture')
            .populate({
                path: 'store',
                populate: [
                    { path: 'profilePicture' },
                    { path: 'category' },
                    { path: 'images' },
                    { path: 'banner' },
                    { path: 'products', populate: [{ path: 'images' }] }
                ]
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: 'Usuario editado exitosamente',
        });
    } catch (error) {
        console.error('Error editing user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
};

// * Delete User
userController.deleteUser = async (req, res) => {
    try {

        User.findById(req.params.id, async function(err,u){
            if(err){
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }else{
                u.remove()
            }
        });


        return res.status(200).json({
            success: true,
            data: { "_id": req.params.id },
            message: 'Usuario eliminado exitosamente',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
};


export default userController;




