import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { deleteItem, getItem, getItems, postItem, uptdateItem, uptdateItems } from '../controllers/product'

const router = Router()

router.get('/:id', checkJwt, getItem)
router.post('/skip', getItems)
router.post('/search', getItems)
router.post('/', checkJwt, postItem)
router.patch('/:id', checkJwt, uptdateItem)
router.patch('/', checkJwt, uptdateItems)
router.delete('/:id', checkJwt, deleteItem)

export { router }
