import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { getItem, getItems, postItem, updateItem } from '../controllers/sale'

const router = Router()

router.get('/', checkJwt, getItems)
router.post('/skip', getItems)
router.post('/search', getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.patch('/:id', checkJwt, updateItem)

export { router }
