import { ObjectId, Types } from 'mongoose'

export interface Sale {
  _id: Types.ObjectId
  estado: string
  user: ObjectId
  cliente: string
  total: Number
  itemsSale: [
    ItemSale
  ]
}

export interface ItemSale {
  _id: Types.ObjectId
  idVenta: ObjectId
  idProducto: ObjectId
  cantidad: Number
  total: Number
}
