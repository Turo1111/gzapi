
import { Request, Response } from 'express'
import { getSale, getSales, insertSale } from '../services/sale'
import { emitSocket } from '../socket'
import { handleHttp } from '../utils/error.handle'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { insertItemSale } from '../services/itemSale'

interface RequestExt extends Request {
  user?: string | JwtPayload | undefined | any
}

const postItem = async ({ body, user }: RequestExt, res: Response): Promise<void> => {
  try {
    console.log({ ...body, user: new Types.ObjectId(user.id) })
    const response = await insertSale({ ...body, user: new Types.ObjectId(user.id) })
    body.itemsSale.map(async (item: any) => await insertItemSale(item))
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
    const response = await getSale(new Types.ObjectId(id))
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM')
  }
}
const getItems = async (_: RequestExt, res: Response): Promise<void> => {
  try {
    const response = await getSales()
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEMS')
  }
}

export { postItem, getItem, getItems }
