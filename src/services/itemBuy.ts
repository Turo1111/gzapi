import { Types } from 'mongoose'
import { ItemBuy } from '../interfaces/buy.interface'
import ItemBuyModel from '../models/itemBuy'

const insertItemBuy = async (item: ItemBuy): Promise<ItemBuy> => {
  console.log(item)
  const responseInsert = await ItemBuyModel.create(item)
  return responseInsert
}

const getItemBuys = async (): Promise<ItemBuy[]> => {
  const response = await ItemBuyModel.find({})
  return response
}

const getItemBuy = async (id: Types.ObjectId): Promise<any> => {
  console.log('aca', id)
  return await ItemBuyModel.aggregate(
    [
      {
        $match: {
          idBuy: id
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'idProducto',
          foreignField: '_id',
          as: 'producto'
        }
      },
      {
        $unwind: '$producto'
      },
      {
        $project: {
          idVenta: 1,
          idProducto: 1,
          cantidad: 1,
          total: 1,
          precioUnitario: '$producto.precioUnitario',
          descripcion: '$producto.descripcion',
          stock: '$producto.stock',
          peso: '$producto.peso',
          sabor: '$producto.sabor',
          categoria: '$producto.categoria'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoria',
          foreignField: '_id',
          as: 'categoria'
        }
      },
      {
        $unwind: '$categoria'
      },
      {
        $project: {
          estado: 1,
          idVenta: 1,
          idProducto: 1,
          cantidad: 1,
          total: 1,
          modificado: 1,
          precioUnitario: 1,
          descripcion: 1,
          stock: 1,
          peso: 1,
          sabor: 1,
          categoria: '$categoria.descripcion'
        }
      }
    ]
  )
}

export { insertItemBuy, getItemBuys, getItemBuy }
