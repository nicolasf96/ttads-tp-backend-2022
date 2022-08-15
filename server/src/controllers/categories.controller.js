const categoryController = {}
import Category from '../models/Category.js'



categoryController.getCategories = async (req, res) => {
    let categories = await Category.find().populate('idCategoryParent');
    return res.status(200).json({
        success: true,
        data: categories,
        message: 'Categories list retrieved successfully',
    })
};


categoryController.getCategory = async (req, res) => {
    let cat = await Category.findOne({"_id":req.params.id});
    return res.status(200).json({
        success: true,
        data: cat,
        message: 'Category found',
    })
};


categoryController.createCategory = async (req, res) => {
    let cat = await new Category(req.body);
    console.log('cat back'+ req)
    await cat.save();
    return res.status(200).json({
        success: true,
        data: cat,
        message: 'Category added successfully',
    })
};


categoryController.editCategory = async (req,res) => {
    const theCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
        success: true,
        data: theCategory,
        message: 'Category edited successfully',
    })
}



categoryController.deleteCategory =  async (req, res) => {
    let catChilds = await Category.find({"idCategoryParent":req.params.id}).exec();
    await catChilds.map(function(cats) {
        Category.deleteOne({"_id": cats._id})
        console.log(cats);
    });
    await Category.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'Category removed successfully',
    })
};

export default categoryController;