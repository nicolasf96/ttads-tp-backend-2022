import Router from 'express';
const router = Router();
import userController from '../controllers/users.controller.js';
import upload from '../middlewares/upload.js'
import jwt from 'jsonwebtoken'



router.get('/', verifyToken, userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/login', userController.loginUser);
router.get('/store/:id', userController.getUserByStore);
router.post('/signup',  userController.createUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);


function verifyToken(req,res, next){
    if(!req.headers.authorization){
        return res.status(401).json({ message: "Unauthorization request"})
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === null){
        return res.status(401).json({ message: "Unauthorization request"})
    }

    const payload = jwt.verify(token, 'secretKey')
    console.log(payload)

    req.userId = payload._id;
    next()
}

export default router;