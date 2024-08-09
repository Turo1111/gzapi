import { ObjectId, Types } from 'mongoose'

export interface Buy {
  _id?: Types.ObjectId
  estado: string
  user: ObjectId
  proveedor: string
  total: Number
  itemsBuy: [
    ItemBuy
  ]
}

export interface ItemBuy {
  _id?: Types.ObjectId
  idBuy: Types.ObjectId
  idProducto: Types.ObjectId
  cantidad: Number
  total: Number
}
