import { Request, Response } from 'express'
import { emitSocket } from '../socket'
import { handleHttp } from '../utils/error.handle'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { getBuy, getBuys, getBuysLimit, insertBuy, qtyBuy, updateBuy } from '../services/buy'
import { getItemBuy, insertItemBuy, updateItemsBuy } from '../services/itemBuy'
import { updateProduct } from '../services/product'
import { ItemBuy } from '../interfaces/buy.interface'

interface RequestExt extends Request {
  user?: string | JwtPayload | undefined | any
}

const postItem = async ({ body, user }: RequestExt, res: Response): Promise<void> => {
  try {
    const response = await insertBuy({ ...body, user: new Types.ObjectId(user.id) })
    await Promise.all(
      body.itemsBuy.map(async (item: ItemBuy) => await insertItemBuy({ idProducto: new Types.ObjectId(item.idProducto), total: item.total, cantidad: item.cantidad, precio: item.precio, idBuy: response._id as Types.ObjectId, estado: true }))
    )
    await Promise.all(
      body.itemsBuy.map(async (item: ItemBuy) => await updateProduct(new Types.ObjectId(item.idProducto), { precioCompra: item.precio }))
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

const updateItem = async ({ params, body, user }: RequestExt, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await updateBuy(new Types.ObjectId(id), { ...body, user: new Types.ObjectId(user.id) })
    await Promise.all(
      body.itemsBuy.map(async (item: any) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (item.idBuy) {
          await updateItemsBuy(new Types.ObjectId(item._id), { ...item })
        } else {
          await insertItemBuy({ idProducto: item.idProducto, total: item.total, cantidad: item.cantidad, idBuy: new Types.ObjectId(id), estado: true, precio: item.precio })
        }
      })
    )
    emitSocket('buy', {
      action: 'update',
      data: response
    })
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_PATCH_ITEM', e)
  }
}

const patchItemBuy = async ({ params, body }: RequestExt, res: Response): Promise<void> => {
  try {
    const { id } = params
    const response = await updateItemsBuy(new Types.ObjectId(id), body)
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_ITEM')
  }
}

export { postItem, getItem, getItems, updateItem, patchItemBuy }
