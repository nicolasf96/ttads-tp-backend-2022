import Express from 'express'

import routerUser from './user.routes.js'
import routerCategory from './categories.routes.js'
import routerStore from './stores.routes.js'
import routerReview from './reviews.routes.js'
import routerProduct from './products.routes.js'
import routerImages from './images.routes.js'

const router = Express.Router();

router.use('/users', routerUser);
router.use('/categories', routerCategory);
router.use('/stores', routerStore);
router.use('/reviews', routerReview);
router.use('/products', routerProduct);
router.use('/images', routerImages);

export default router;