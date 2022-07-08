import Router from 'express';
const router = Router();
import userController from '../controllers/users.controller.js';
import upload from '../middlewares/upload.js'



router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', upload.single('myFile'), userController.createUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);


export default router;