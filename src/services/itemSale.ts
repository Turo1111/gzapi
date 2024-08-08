import { Types } from 'mongoose'
import { ItemSale } from '../interfaces/sale.interface'
import ItemSaleModel from '../models/itemSale'

const insertItemSale = async (item: ItemSale): Promise<ItemSale> => {
  console.log(item)
  const responseInsert = await ItemSaleModel.create(item)
  return responseInsert
}

const getItemSales = async (): Promise<ItemSale[]> => {
  const response = await ItemSaleModel.find({})
  return response
}

const getItemSale = async (id: Types.ObjectId): Promise<any> => {
  console.log('aca', id)
  return await ItemSaleModel.aggregate(
    [
      {
        $match: {
          idVenta: id
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

export { insertItemSale, getItemSales, getItemSale }
