import { Request, Response } from 'express'
import { emitSocket } from '../socket'
import { handleHttp } from '../utils/error.handle'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { getBuy, getBuys, getBuysLimit, insertBuy, qtyBuy } from '../services/buy'
import { getItemBuy, insertItemBuy } from '../services/itemBuy'

interface RequestExt extends Request {
  user?: string | JwtPayload | undefined | any
}

const postItem = async ({ body, user }: RequestExt, res: Response): Promise<void> => {
  try {
    console.log({ ...body, user: new Types.ObjectId(user.id) })
    const response = await insertBuy({ ...body, user: new Types.ObjectId(user.id) })
    await Promise.all(
      body.itemsBuy.map(async (item: any) => await insertItemBuy({ idProducto: item._id, total: item.total, cantidad: item.cantidad, idBuy: response._id as Types.ObjectId }))
    )
    emitSocket('buy', {
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
    const response = await getBuy(new Types.ObjectId(id))
    const response2 = await getItemBuy(new Types.ObjectId(id))
    console.log(response2)
    res.send({ r: response[0], itemsBuy: response2 })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM')
  }
}
const getItems = async ({ body }: RequestExt, res: Response): Promise<void> => {
  try {
    const { input, skip, limit } = body

    if (input !== undefined) {
      const response = await getBuys(input)
      console.log(response.length)
      res.send(response)
    } else {
      const response = await getBuysLimit(parseInt(skip), parseInt(limit))
      const cantidad = await qtyBuy()
      res.send({ array: response, longitud: cantidad })
    }
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEMS')
  }
}

export { postItem, getItem, getItems }
