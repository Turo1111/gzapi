import { Schema, model } from 'mongoose'
import { Client } from '../interfaces/client.interface'

const ClientSchema = new Schema<Client>(
  {
    nombreCompleto: {
      type: String,
      require: true
    },
    direccion: {
      type: String
    },
    telefonos: {
      type: [
        Number
      ]
    },
    idCiudad: {
      type: Schema.ObjectId,
      ref: 'City',
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ClientModel = model('client', ClientSchema)
export default ClientModel

