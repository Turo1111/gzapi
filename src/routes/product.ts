import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { deleteItem, getImage, getItem, getItems, postItem, uploadImage, uptdateItem, uptdateItems } from '../controllers/product'
import multerMiddleware, { compressImage } from '../middleware/file'

const router = Router()

router.get('/:id', checkJwt, getItem)
router.post('/skip', getItems)
router.post('/search', getItems)
router.post('/', checkJwt, postItem)
router.post('/uploadImage', multerMiddleware.single('myfile'), compressImage, uploadImage)
router.get('/image/:image', getImage)
router.patch('/:id', checkJwt, uptdateItem)
router.patch('/', checkJwt, uptdateItems)
router.delete('/:id', checkJwt, deleteItem)

export { router }
