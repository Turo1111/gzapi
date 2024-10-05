import { Router } from 'express'
import { checkJwt } from '../middleware/session'
import { getItem, getItems, postItem, postMultipleItem, printSale, printSales, updateItem } from '../controllers/sale'

const router = Router()

router.get('/', checkJwt, getItems)
router.post('/skip', getItems)
router.post('/search', getItems)
router.get('/:id', checkJwt, getItem)
router.post('/', checkJwt, postItem)
router.post('/multiple', checkJwt, postMultipleItem)
router.patch('/:id', checkJwt, updateItem)
router.get('/print/:id', printSale)
router.post('/print', printSales)

export { router }
