import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { deleteItem, getItem, getItems, postItem } from '../controllers/itemSale'

const router = Router()

router.get('/', getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.delete('/:id', checkJwt, deleteItem)

export { router }
