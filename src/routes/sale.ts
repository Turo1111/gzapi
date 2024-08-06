import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { getItem, getItems, postItem } from '../controllers/sale'

const router = Router()

router.get('/', getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)

export { router }
