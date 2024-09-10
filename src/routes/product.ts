import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { deleteItem, getAllItems, getImage, getItem, getItems, postItem, uptdateItem, uptdateItems } from '../controllers/product'
/* import multerMiddleware, { compressImage } from '../middleware/file' */

const router = Router()

router.get('/:id', checkJwt, getItem)
router.get('/', checkJwt, getAllItems)
router.post('/skip',checkJwt, getItems)
router.post('/search',checkJwt, getItems)
router.post('/', checkJwt, postItem)
/* router.post('/uploadImage', multerMiddleware.single('myfile'), compressImage, uploadImage) */
router.get('/image/:image', getImage)
router.patch('/:id', checkJwt, uptdateItem)
router.patch('/', checkJwt, uptdateItems)
router.delete('/:id', checkJwt, deleteItem)

export { router }
