import Express from 'express'
import client from './client.js'
import user from './user.js'

const router = Express.Router()


router.use('/client', client);
router.use('/user', user);


export default router;