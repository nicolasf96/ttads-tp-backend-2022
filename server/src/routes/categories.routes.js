import Router from 'express';
const routerCategory = Router();
import CategoryController from '../controllers/categories.controller.js';

routerCategory.get('/', CategoryController.getCategories);
routerCategory.get('/:id', CategoryController.getCategory);
routerCategory.post('/', CategoryController.createCategory);
routerCategory.put('/:id', CategoryController.editCategory);
routerCategory.delete('/:id', CategoryController.deleteCategory);


export default routerCategory;