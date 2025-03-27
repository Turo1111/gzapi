
import { Request, Response } from 'express'
import { emitSocket } from '../socket'
import { handleHttp } from '../utils/error.handle'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { deleteItemsSale, getItemSale, getItemSales, getListBuyAvg, getListBuyByDateRange, insertItemSale, updateItemsSale } from '../services/itemSale'

interface RequestExt extends Request {
  user?: string | JwtPayload | undefined | any
}

const postItem = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const response = await insertItemSale(body)
    emitSocket('sale', {
      action: 'create',
      data: response
    })
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_POST_ITEM', e)
  }
}

const getItem = async ({ params }: RequestExt, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await getItemSale(new Types.ObjectId(id))
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM')
  }
}
const getItems = async (_: RequestExt, res: Response): Promise<void> => {
  try {
    const response = await getItemSales()
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEMS')
  }
}

const deleteItem = async ({ params }: RequestExt, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await deleteItemsSale(new Types.ObjectId(id))
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_ITEM')
  }
}

const patchItem = async ({ params, body }: RequestExt, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await updateItemsSale(new Types.ObjectId(id), body)
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_ITEM')
  }
}

const getListBuyByDateRangeCtrl = async ({ params }: RequestExt, res: Response): Promise<void> => {
  try {
    const { start, end, prov } = params
    console.log(start, end, prov)
    const response = await getListBuyByDateRange(start, end, prov)
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_LISTBUY')
  }
}

const getListBuyAvgCtrl = async ({ params }: RequestExt, res: Response): Promise<void> => {
  try {
    const { prov } = params
    const response = await getListBuyAvg(prov)
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_LISTBUYAVG')
  }
}

export { postItem, getItem, getItems, deleteItem, patchItem, getListBuyByDateRangeCtrl, getListBuyAvgCtrl }
