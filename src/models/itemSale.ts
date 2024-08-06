import { Schema, model } from 'mongoose'
import { ItemSale } from '../interfaces/sale.interface'

const ItemSaleSchema = new Schema<ItemSale>({
  idVenta: {
    type: Schema.ObjectId,
    ref: 'sale',
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

const ItemSaleModel = model('itemSale', ItemSaleSchema)
export default ItemSaleModel
