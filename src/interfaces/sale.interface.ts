import { ObjectId, Types } from 'mongoose'

export interface Sale {
  _id: Types.ObjectId
  estado: string
  user: ObjectId
  cliente: string
  total: number
  createdAt: string
  itemsSale: ItemSale[]
  porcentaje?: number
}

export interface ItemSale {
  _id?: Types.ObjectId
  idVenta: Types.ObjectId
  idProducto: Types.ObjectId
  cantidad: number
  total: number
  estado: boolean
  descripcion?: string
  precioUnitario: number
  precio?: number
}
