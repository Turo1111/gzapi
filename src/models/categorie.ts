import { Schema, model } from 'mongoose'
import { Categorie } from '../interfaces/product.interface'

const CategorieSchema = new Schema<Categorie>(
  {
    descripcion: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const CategorieModel = model('categorie', CategorieSchema)
export default CategorieModel
