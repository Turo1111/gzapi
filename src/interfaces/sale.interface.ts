import { ObjectId, Types } from 'mongoose'

export interface Sale {
  _id: Types.ObjectId
  estado: string
  user: ObjectId
  cliente: string
  total: Number
  itemsSale: ItemSale[]
}

export interface ItemSale {
  _id?: Types.ObjectId
  idVenta: Types.ObjectId
  idProducto: Types.ObjectId
  cantidad: Number
  total: Number
  estado: boolean
}
