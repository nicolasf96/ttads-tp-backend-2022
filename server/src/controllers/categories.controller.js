const categoryController = {}
import Category from '../models/Category.js'


// curl http://localhost:3000/api/v1/Category/
//getAll
categoryController.getCategories = async (req, res) => {
    let categories = await Category.find();
    return res.status(200).json({
        success: true,
        data: categories,
        message: 'Categories list retrieved successfully',
    })
};

// curl http://localhost:3000/api/v1/client/<id>
//getOne
categoryController.getCategory = async (req, res) => {
    let cat = await Category.findOne({"_id":req.params.id});
    return res.status(200).json({
        success: true,
        data: cat,
        message: 'Category found',
    })
};



//curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Juan", "lastName": "Perez", "email": "jp@gmail.com", "address": "undisclosed"}' http://localhost:3000/api/v1/client/
//new
categoryController.createCategory = async (req, res) => {
    let cat = await new Category(req.body);
    await cat.save();
    return res.status(200).json({
        success: true,
        data: cat,
        message: 'Category added successfully',
    })
};


categoryController.editCategory = async (req,res) => {
    const theCategory = await Category.findByIdAndUpdate(req.params.id, req.params.body);
    return res.status(200).json({
        success: true,
        data: theCategory,
        message: 'Category edited successfully',
    })
}


//curl -X DELETE http://localhost:3000/api/v1/client/<id>
categoryController.deleteCategory =  async (req, res) => {
    await Category.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'Category removed successfully',
    })
};

export default categoryController;