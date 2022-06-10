import Router from 'express';
const router = Router();
import UserController from '../controllers/users.controller.js';

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/:id', UserController.editUser);
router.delete('/:id', UserController.deleteUser);


export default router;