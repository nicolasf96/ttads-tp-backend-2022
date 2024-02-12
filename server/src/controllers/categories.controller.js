const categoryController = {}
import Category from '../models/Category.js'


// * getAll Categories
categoryController.getCategories = async (req, res) => {
    try {
        let categories = await Category.find().populate('idCategoryParent');
        return res.status(200).json({
            success: true,
            data: categories,
            message: 'Categories list retrieved successfully',
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * get Category
categoryController.getCategory = async (req, res) => {
    try {
        let cat = await Category.findOne({"_id": req.params.id}).populate('idCategoryParent');
        if (!cat) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        return res.status(200).json({
            success: true,
            data: cat,
            message: 'Category found',
        });
    } catch (error) {
        console.error('Error fetching category:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//  * create Category
categoryController.createCategory = async (req, res) => {
    try {
        let cat = await new Category(req.body).save();
        return res.status(201).json({
            success: true,
            data: cat,
            message: 'Category added successfully',
        });
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// * edit Category
categoryController.editCategory = async (req, res) => {
    try {
        let cat = await Category.findByIdAndUpdate(req.params.id, req.body);
        if (!cat) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        cat = await Category.findOne({"_id": req.params.id}).populate('idCategoryParent');
        return res.status(200).json({
            success: true,
            data: cat,
            message: 'Category edited successfully',
        });
    } catch (error) {
        console.error('Error editing category:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

//  * delete Category
categoryController.deleteCategory = async (req, res) => {
    try {
        let catChilds = await Category.find({"idCategoryParent": req.params.id});
        await Promise.all(catChilds.map(async (cats) => {
            await Category.deleteOne({"_id": cats._id});
        }));
        await Category.deleteOne({"_id": req.params.id});
        return res.status(200).json({
            success: true,
            data: {"_id": req.params.id},
            message: 'Category removed successfully',
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default categoryController;