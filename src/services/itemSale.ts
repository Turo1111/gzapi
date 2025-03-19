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
      },
      {
        $sort: { descripcion: 1 } // Ordena alfabéticamente por el campo 'descripcion' (1 = ascendente, -1 = descendente)
      }
    ]
  );
}

const updateItemsSale = async (id: Types.ObjectId, item: Partial<ItemSale>): Promise<any> => {
  const response = await ItemSaleModel.updateOne({ _id: id }, { $set: item })
  return response
}

const deleteItemsSale = async (id: Types.ObjectId): Promise<any> => {
  const response = await ItemSaleModel.deleteOne({ _id: id })
  return response
}

const getSoldProductsByDateRange = async (start: string, end: string): Promise<any> => {

  const startDate = new Date(start);
  const endDate = new Date(end);

  try {
    const result = await ItemSaleModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: '$idProducto',
          totalVendido: { $sum: '$cantidad' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'producto'
        }
      },
      {
        $unwind: '$producto'
      },
      {
        $project: {
          _id: 0,
          producto: '$producto.descripcion',
          idProveedor: '$producto.proveedor',
          totalVendido: 1
        }
      },
      {
        $lookup: {
          from: 'providers',
          localField: 'idProveedor',
          foreignField: '_id',
          as: 'proveedor'
        }
      },
      {
        $unwind: '$proveedor'
      },
      {
        $project: {
          _id: 0,
          producto: 1,
          NameProvider: '$proveedor.descripcion',
          totalVendido: 1
        }
      },
      {
        $sort: { totalVendido: -1 }
      } 
    ]);

    return result;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  }
};

/* const getSoldProductsByDateRange = async (start: string, end: string): Promise<any> => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Calcular las fechas de las 4 semanas anteriores
  const previousWeeks = Array.from({ length: 4 }, (_, i) => {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() - 7 * (i + 1));

    const weekEnd = new Date(endDate);
    weekEnd.setDate(weekEnd.getDate() - 7 * (i + 1));

    return { weekStart, weekEnd };
  });

  try {
    // Consulta para el intervalo dado y las 4 semanas anteriores
    const result = await ItemSaleModel.aggregate([
      {
        $match: {
          $or: [
            // Intervalo dado
            {
              createdAt: {
                $gte: startDate,
                $lte: endDate,
              },
            },
            // 4 semanas anteriores
            ...previousWeeks.map(({ weekStart, weekEnd }) => ({
              createdAt: {
                $gte: weekStart,
                $lte: weekEnd,
              },
            })),
          ],
        },
      },
      {
        $group: {
          _id: '$idProducto',
          totalVendido: { $sum: '$cantidad' },
          count: { $sum: 1 }, // Contar cuántas semanas contribuyeron
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'producto',
        },
      },
      {
        $unwind: '$producto',
      },
      {
        $project: {
          _id: 0,
          producto: '$producto.descripcion',
          idProveedor: '$producto.proveedor',
          totalVendido: 1,
          count: 1,
        },
      },
      {
        $lookup: {
          from: 'providers',
          localField: 'idProveedor',
          foreignField: '_id',
          as: 'proveedor',
        },
      },
      {
        $unwind: '$proveedor',
      },
      {
        $project: {
          _id: 0,
          producto: 1,
          NameProvider: '$proveedor.descripcion',
          totalVendido: 1,
          promedioVendido: { $divide: ['$totalVendido', '$count'] }, // Calcular el promedio
        },
      },
      {
        $sort: { totalVendido: -1 },
      },
    ]);

    return result;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  }
}; */

export { insertItemSale, getItemSales, getItemSale, updateItemsSale, deleteItemsSale, getSoldProductsByDateRange }
