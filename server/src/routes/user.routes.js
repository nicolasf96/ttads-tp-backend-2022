import Router from 'express';
const router = Router();
import userController from '../controllers/users.controller.js';

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);


export default router;