import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { patchItemBuy } from '../controllers/buy'
const router = Router()

router.patch('/:id', checkJwt, patchItemBuy)

export { router }
