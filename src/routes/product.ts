import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { deleteItem, getAllItems, getImage, getItem, getItems, getNothing, postItem, printList, printListWithDiscount, uptdateItem, uptdateItems } from '../controllers/product'
/* import multerMiddleware, { compressImage } from '../middleware/file' */

const router = Router()

router.get('/:id', checkJwt, getItem)
router.get('/', getAllItems)
router.post('/skip', getItems)
router.post('/search', getItems)
router.post('/', checkJwt, postItem) //este
/* router.post('/uploadImage', multerMiddleware.single('myfile'), compressImage, uploadImage) */
router.get('/image/:image', getImage)
router.get('/active', getNothing)
router.patch('/:id', checkJwt, uptdateItem) //este
router.patch('/', checkJwt, uptdateItems)
router.delete('/:id', checkJwt, deleteItem)
router.post('/print/print', printList)
router.post('/print/print-with-discount', printListWithDiscount)


export { router }
