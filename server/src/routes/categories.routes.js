import Router from 'express';
const routerCategory = Router();
import categoryController from '../controllers/categories.controller.js';

routerCategory.get('/', categoryController.getCategories);
routerCategory.get('/:id', categoryController.getCategory);
routerCategory.post('/', categoryController.createCategory);
routerCategory.put('/:id', categoryController.editCategory);
routerCategory.delete('/:id', categoryController.deleteCategory);


export default routerCategory;