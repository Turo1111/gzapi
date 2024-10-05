import { Router } from 'express'
import { annuallyCtrl, bestSellingCtrl, dailyCtrl, dataProductCtrl, highProfitCtrl, monthlyCtrl, weeklyCtrl } from '../controllers/dataset'

const router = Router()

router.get('/daily', dailyCtrl)
router.get('/weekly', weeklyCtrl)
router.get('/monthly', monthlyCtrl)
router.get('/annually', annuallyCtrl)
router.get('/bestSelling', bestSellingCtrl)
router.get('/highProfit', highProfitCtrl)
router.get('/dataProduct', dataProductCtrl)

export { router }
