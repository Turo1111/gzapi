
import { Request, Response } from 'express'
import { getSale, getSales, insertSale } from '../services/sale'
import { emitSocket } from '../socket'
import { handleHttp } from '../utils/error.handle'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { getItemSale, insertItemSale } from '../services/itemSale'

interface RequestExt extends Request {
  user?: string | JwtPayload | undefined | any
}

const postItem = async ({ body, user }: RequestExt, res: Response): Promise<void> => {
  try {
    console.log({ ...body, user: new Types.ObjectId(user.id) })
    const response = await insertSale({ ...body, user: new Types.ObjectId(user.id) })
    console.log(response._id)
    await Promise.all(
      body.itemsSale.map(async (item: any) => await insertItemSale({ idProducto: item._id, total: item.total, cantidad: item.cantidad, idVenta: response._id }))
    )
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
    const response2 = await getItemSale(new Types.ObjectId(id))
    console.log(response2)
    res.send({ r: response[0], itemsSale: response2 })
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
