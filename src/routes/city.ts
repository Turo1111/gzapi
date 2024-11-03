import { Router } from "express"
import { getItem, getItems, postItem, uptdateItem } from "../controllers/city"
import { checkJwt } from "../middleware/session"

const router = Router()

router.get('/', checkJwt, getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.patch('/:id', checkJwt, uptdateItem)

export { router }