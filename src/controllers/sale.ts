
import { Request, Response } from 'express'
import { getSale, getSales, getSalesLimit, insertSale, qtySale, updateSale } from '../services/sale'
import { emitSocket } from '../socket'
import { handleHttp } from '../utils/error.handle'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { getItemSale, insertItemSale, updateItemsSale } from '../services/itemSale'

interface RequestExt extends Request {
  user?: string | JwtPayload | undefined | any
}

const postItem = async ({ body, user }: RequestExt, res: Response): Promise<void> => {
  try {
    const response = await insertSale({ ...body, user: new Types.ObjectId(user.id) })
    await Promise.all(
      body.itemsSale.map(async (item: any) => await insertItemSale({ idProducto: item._id, total: item.total, cantidad: item.cantidad, idVenta: response._id, estado: true }))
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
    res.send({ r: response[0], itemsSale: response2 })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM')
  }
}

const getItems = async ({ body }: RequestExt, res: Response): Promise<void> => {
  try {
    const { input, skip, limit } = body

    if (input !== undefined) {
      const response = await getSales(input)
      res.send(response)
    } else {
      const response = await getSalesLimit(parseInt(skip), parseInt(limit))
      const cantidad = await qtySale()
      res.send({ array: response, longitud: cantidad })
    }
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEMS')
  }
}

const updateItem = async ({ params, body, user }: RequestExt, res: Response): Promise<void> => {
  try {
    const { id } = params
    console.log(body)
    const response = await updateSale(new Types.ObjectId(id), { ...body, user: new Types.ObjectId(user.id) })
    await Promise.all(
      body.itemsSale.map(async (item: any) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (item.idVenta) {
          await updateItemsSale(new Types.ObjectId(item._id), { ...item })
        } else {
          await insertItemSale({ idProducto: item._id, total: item.total, cantidad: item.cantidad, idVenta: new Types.ObjectId(id), estado: true })
        }
      })
    )
    emitSocket('sale', {
      action: 'update',
      data: response
    })
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_PATCH_ITEM', e)
  }
}

export { postItem, getItem, getItems, updateItem }
