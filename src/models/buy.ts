import { Schema, model } from 'mongoose'
import { Buy } from '../interfaces/buy.interface'

const BuySchema = new Schema<Buy>(
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
    proveedor: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const BuyModel = model('buy', BuySchema)
export default BuyModel
