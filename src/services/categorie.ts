import { Types } from 'mongoose'
import { Categorie } from '../interfaces/product.interface'
import CategorieModel from '../models/categorie'

const insertCategorie = async (item: Categorie): Promise<Categorie> => {
  const responseInsert = await CategorieModel.create(item)
  return responseInsert
}

const getCategories = async (): Promise<Categorie[]> => {
  const response = await CategorieModel.find({})
  return response
}

const getCategorie = async (id: Types.ObjectId): Promise<any> => {
  const response = await CategorieModel.find({ _id: id })
  return response
}

const updateCategorie = async (id: Types.ObjectId, item: Categorie): Promise<any> => {
  const response = await CategorieModel.updateOne({ _id: id }, { $set: item })
  return response
}

export { getCategorie, getCategories, insertCategorie, updateCategorie }
