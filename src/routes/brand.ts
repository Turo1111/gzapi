import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { deleteItem, getItem, getItems, postItem, uptdateItem } from '../controllers/brand'

const router = Router()

router.get('/', getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.patch('/:id', checkJwt, uptdateItem)
router.delete('/:id', checkJwt, deleteItem)

export { router }
