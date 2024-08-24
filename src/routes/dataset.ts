import { Router } from 'express'
import { annuallyCtrl, dailyCtrl, monthlyCtrl, weeklyCtrl } from '../controllers/dataset'

const router = Router()

router.get('/daily', dailyCtrl)
router.get('/weekly', weeklyCtrl)
router.get('/monthly', monthlyCtrl)
router.get('/annually', annuallyCtrl)

export { router }
