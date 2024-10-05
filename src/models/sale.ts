import { Schema, model } from 'mongoose'
import { Sale } from '../interfaces/sale.interface'

const SaleSchema = new Schema<Sale>(
  {
    estado: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    cliente: {
      type: String
    },
    porcentaje: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const SaleModel = model('sale', SaleSchema)
export default SaleModel
