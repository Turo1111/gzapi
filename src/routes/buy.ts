import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { getItem, getItems, postItem } from '../controllers/buy'

const router = Router()

router.get('/', checkJwt, getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)

export { router }
