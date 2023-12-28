import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'
import { emitSocket } from '../socket'
import { findProducts, getProduct, getProducts, getProductsSearch, insertProduct, updateProduct } from '../services/product'
import { Product } from '../interfaces/product.interface'

interface RequestExt extends Request {
  user?: string | JwtPayload | undefined | any
}

const getItem = async ({ params }: RequestExt, res: Response): Promise<void> => {
  try {
    const { id } = params
    console.log(id)
    const response = await getProduct(new Types.ObjectId(id))
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEM')
  }
}
const getItems = async ({ body }: RequestExt, res: Response): Promise<void> => {
  try {
    const { input, skip, limit } = body

    const filter = {
      categoria: body.categoria,
      marca: body.marca,
      proveedor: body.proveedor
    }

    if (body.categoria !== '') {
      filter.categoria = new Types.ObjectId(body.categoria)
    } else {
      delete filter.categoria
    }

    if (body.marca !== '') {
      filter.marca = new Types.ObjectId(body.marca)
    } else {
      delete filter.marca
    }

    if (body.proveedor !== '') {
      filter.proveedor = new Types.ObjectId(body.proveedor)
    } else {
      delete filter.proveedor
    }

    if (input !== undefined) {
      const response = await getProductsSearch(input, filter)
      res.send(response)
    } else {
      const response = await getProducts(parseInt(skip), parseInt(limit))
      res.send(response)
    }
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ITEMS')
  }
}
const uptdateItem = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const { id } = params
    console.log(body)
    const response = await updateProduct(new Types.ObjectId(id), { ...body, categoria: new Types.ObjectId(body.categoria), marca: new Types.ObjectId(body.marca), proveedor: new Types.ObjectId(body.proveedor) })
    emitSocket('product', {
      action: 'update',
      data: response
    })
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_ITEM')
  }
}
const uptdateItems = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const filter = {
      categoria: body.categoria,
      marca: body.marca,
      proveedor: body.proveedor
    }

    const porcentaje: number = body.porcentaje

    if (body.categoria !== '') {
      filter.categoria = new Types.ObjectId(body.categoria)
    } else {
      delete filter.categoria
    }

    if (body.marca !== '') {
      filter.marca = new Types.ObjectId(body.marca)
    } else {
      delete filter.marca
    }

    if (body.proveedor !== '') {
      filter.proveedor = new Types.ObjectId(body.proveedor)
    } else {
      delete filter.proveedor
    }

    const products = await findProducts(filter)

    const response = products.map(async (item: Product): Promise<Product> => {
      const newPrice = parseFloat((item.precioUnitario + (item.precioUnitario * porcentaje) / 100).toFixed(2))
      item.precioUnitario = newPrice
      await updateProduct(item._id, item)
      return item
    })

    emitSocket('product', {
      action: 'updateMany',
      data: response
    })
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_ITEM')
  }
}
const postItem = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const response = await insertProduct({ ...body, categoria: new Types.ObjectId(body.categoria), marca: new Types.ObjectId(body.marca), proveedor: new Types.ObjectId(body.proveedor) })
    emitSocket('product', {
      action: 'create',
      data: response
    })
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_POST_ITEM', e)
  }
}
const deleteItem = (_: Request, res: Response): void => {
  try {
    res.send({ data: 'algo' })
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_ITEM')
  }
}

export { getItem, getItems, uptdateItem, postItem, deleteItem, uptdateItems }
