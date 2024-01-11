import { Types } from 'mongoose'
import { Product } from '../interfaces/product.interface'
import ProductModel from '../models/product'

const insertProduct = async (item: Product): Promise<Product> => {
  const responseInsert = await ProductModel.create(item)
  return responseInsert
}

const getProducts = async (skip: number, limit: number): Promise<Product[]> => {
  return await ProductModel.aggregate(
    [
      {
        $lookup: {
          from: 'categories',
          localField: 'categoria',
          foreignField: '_id',
          as: 'categoria'
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'marca',
          foreignField: '_id',
          as: 'marca'
        }
      },
      {
        $lookup: {
          from: 'providers',
          localField: 'proveedor',
          foreignField: '_id',
          as: 'proveedor'
        }
      },
      {
        $project: {
          descripcion: 1,
          stock: 1,
          codigoBarra: 1,
          peso: 1,
          sabor: 1,
          bulto: 1,
          precioBulto: 1,
          precioCompra: 1,
          precioUnitario: 1,
          categoria: '$categoria._id',
          proveedor: '$proveedor._id',
          marca: '$marca._id',
          NameProveedor: '$proveedor.descripcion',
          NameMarca: '$marca.descripcion',
          NameCategoria: '$categoria.descripcion'
        }
      },
      {
        $unwind: '$categoria'
      },
      {
        $unwind: '$proveedor'
      },
      {
        $unwind: '$marca'
      },
      {
        $unwind: '$NameProveedor'
      },
      {
        $unwind: '$NameMarca'
      },
      {
        $unwind: '$NameCategoria'
      }
    ]
  ).skip(skip).limit(limit)
}

const getProductsSearch = async (input: string, filter: Filter): Promise<Product[]> => {
  let query: any = {
  }

  if (input !== '') {
    query.descripcion = {
      $regex: input,
      $options: 'i'
    }
  }

  if (filter.categoria !== undefined || filter.marca !== undefined || filter.proveedor !== undefined) {
    query = Object.assign({}, query, filter)
  }

  console.log('query', query)

  return await ProductModel.aggregate(
    [
      {
        $lookup: {
          from: 'categories',
          localField: 'categoria',
          foreignField: '_id',
          as: 'categoria'
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'marca',
          foreignField: '_id',
          as: 'marca'
        }
      },
      {
        $lookup: {
          from: 'providers',
          localField: 'proveedor',
          foreignField: '_id',
          as: 'proveedor'
        }
      },
      {
        $project: {
          descripcion: 1,
          stock: 1,
          codigoBarra: 1,
          precioUnitario: 1,
          categoria: '$categoria._id',
          marca: '$marca._id',
          proveedor: '$proveedor._id',
          NameMarca: '$marca.descripcion',
          NameCategoria: '$categoria.descripcion',
          NameProveedor: '$proveedor.descripcion'
        }
      },
      {
        $unwind: '$categoria'
      },
      {
        $unwind: '$marca'
      },
      {
        $unwind: '$proveedor'
      },
      {
        $unwind: '$NameMarca'
      },
      {
        $unwind: '$NameCategoria'
      },
      {
        $unwind: '$NameProveedor'
      },
      {
        $match: query
      }
    ]
  )
}

const getProduct = async (id: Types.ObjectId): Promise<any> => {
  return await ProductModel.aggregate(
    [
      {
        $match: {
          _id: {
            $eq: id
          }
        }
      }/* ,
      {
        $lookup: {
          from: 'categories',
          localField: 'categoria',
          foreignField: '_id',
          as: 'categoria'
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'marca',
          foreignField: '_id',
          as: 'marca'
        }
      },
      {
        $lookup: {
          from: 'providers',
          localField: 'proveedor',
          foreignField: '_id',
          as: 'proveedor'
        }
      },
      {
        $project: {
          descripcion: 1,
          stock: 1,
          codigoBarra: 1,
          peso: 1,
          sabor: 1,
          bulto: 1,
          precioBulto: 1,
          precioCompra: 1,
          precioUnitario: 1,
          categoria: '$categoria._id',
          proveedor: '$proveedor._id',
          marca: '$marca._id',
          NameProveedor: '$proveedor.descripcion',
          NameMarca: '$marca.descripcion',
          NameCategoria: '$categoria.descripcion'
        }
      },
      {
        $unwind: '$categoria'
      },
      {
        $unwind: '$proveedor'
      },
      {
        $unwind: '$marca'
      },
      {
        $unwind: '$NameProveedor'
      },
      {
        $unwind: '$NameMarca'
      },
      {
        $unwind: '$NameCategoria'
      } */
    ]
  )
}

const updateProduct = async (id: Types.ObjectId, item: Product): Promise<any> => {
  const response = await ProductModel.updateOne({ _id: id }, { $set: item })
  return response
}

export interface Filter {
  categoria?: string
  proveedor?: string
  marca?: string
}

const findProducts = async (filter: Filter): Promise<any> => {
  const query = []

  if (filter.categoria !== undefined) {
    query.push({ categoria: filter.categoria })
  }

  if (filter.proveedor !== undefined) {
    query.push({ proveedor: filter.proveedor })
  }

  if (filter.marca !== undefined) {
    query.push({ marca: filter.marca })
  }

  const response = await ProductModel.find({ $and: query })

  return response
}

export { getProduct, getProducts, insertProduct, updateProduct, getProductsSearch, findProducts }
