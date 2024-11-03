import { Router } from "express"
import { getItem, getItems, postItem, uptdateItem } from "../controllers/client"
import { checkJwt } from "../middleware/session"

const router = Router()

router.post('/skip', checkJwt, getItems)
router.post('/search', checkJwt, getItems)
router.get('/', checkJwt, getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.patch('/:id', checkJwt, uptdateItem)

export { router }