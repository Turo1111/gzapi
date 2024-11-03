import { Router } from "express"
import { checkJwt } from "../middleware/session"
import { getItems } from "../controllers/log"

const router = Router()

router.post('/', checkJwt, getItems)

export { router }