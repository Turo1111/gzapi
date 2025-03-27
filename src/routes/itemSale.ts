import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { deleteItem, getItem, getItems, getListBuyAvgCtrl, getListBuyByDateRangeCtrl, patchItem, postItem } from '../controllers/itemSale'


const router = Router()

router.get('/', getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.patch('/:id', checkJwt, patchItem)
router.delete('/:id', checkJwt, deleteItem)
router.get('/listbuy/:start/:end/:prov', getListBuyByDateRangeCtrl)
router.get('/listbuyavg/:prov', getListBuyAvgCtrl)

export { router }
