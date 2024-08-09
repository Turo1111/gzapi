import { Schema, model } from 'mongoose'
import { ItemBuy } from '../interfaces/buy.interface'

const ItemBuySchema = new Schema<ItemBuy>({
  idBuy: {
    type: Schema.ObjectId,
    ref: 'buy',
    require: true
  },
  idProducto: {
    type: Schema.ObjectId,
    ref: 'product',
    require: true
  },
  cantidad: {
    type: Number,
    require: true
  },
  total: {
    type: Number,
    require: true
  }
},
{
  timestamps: true,
  versionKey: false
}
)

const ItemBuyModel = model('itemBuy', ItemBuySchema)
export default ItemBuyModel
