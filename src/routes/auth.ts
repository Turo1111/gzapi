import { Router } from 'express'
import { loginCtrl, registerCtrl } from '../controllers/auth'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', registerCtrl)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/login', loginCtrl)

export { router }
