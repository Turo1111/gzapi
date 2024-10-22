import { Types } from 'mongoose'
import { ItemSale } from '../interfaces/sale.interface'
import ItemSaleModel from '../models/itemSale'

const insertItemSale = async (item: ItemSale): Promise<ItemSale> => {
  const responseInsert = await ItemSaleModel.create(item)
  return responseInsert
}

const getItemSales = async (): Promise<ItemSale[]> => {
  const response = await ItemSaleModel.find({})
  return response
}

const getItemSale = async (id: Types.ObjectId): Promise<any> => {
  return await ItemSaleModel.aggregate(
    [
      {
        $match: {
          idVenta: id,
          $or: [
            { estado: true },
            { estado: { $exists: false } }
          ]
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
          precioUnitario: 1,
          precio: '$producto.precioUnitario',
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
          precio: 1,
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

const updateItemsSale = async (id: Types.ObjectId, item: Partial<ItemSale>): Promise<any> => {
  const response = await ItemSaleModel.updateOne({ _id: id }, { $set: item })
  return response
}

const deleteItemsSale = async (id: Types.ObjectId): Promise<any> => {
  const response = await ItemSaleModel.deleteOne({ _id: id })
  return response
}

export { insertItemSale, getItemSales, getItemSale, updateItemsSale, deleteItemsSale }
