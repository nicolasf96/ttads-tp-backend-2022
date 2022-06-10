import Express from 'express'
import Client from '../../../models/Client.js'
import Pet from '../../../models/Pet.js'

const router = Express.Router()

// curl http://localhost:3000/api/v1/client/
//getAll
router.get('/', async (req, res) => {
    let clients = await Client.find().populate('pets');
    return res.status(200).json({
        success: true,
        data: clients,
        message: 'clients list retrieved successfully',
    })
})

// curl http://localhost:3000/api/v1/client/<id>
//getOne
router.get('/:id', async (req, res) => {
    let cli = await Client.findOne({"_id":req.params.id}).populate('pets');
    return res.status(200).json({
        success: true,
        data: cli,
        message: 'Client found',
    })
})



//curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Juan", "lastName": "Perez", "email": "jp@gmail.com", "address": "undisclosed"}' http://localhost:3000/api/v1/client/
//new
router.post('/', async (req, res) => {
    let cli = await new Client(req.body);
    await cli.save();
    return res.status(200).json({
        success: true,
        data: cli,
        message: 'Client added successfully',
    })
})

//curl -X DELETE http://localhost:3000/api/v1/client/<id>
router.delete('/:id', async (req, res) => {
    await Client.deleteOne({"_id": req.params.id});
    return res.status(200).json({
        success: true,
        data: {"_id": req.params.id},
        message: 'Client removed successfully',
    })
})

export default router