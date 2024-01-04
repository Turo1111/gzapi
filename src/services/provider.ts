import ProviderModel from '../models/provider'
import { Provider } from './../interfaces/product.interface'
import { Types } from 'mongoose'

const insertProvider = async (item: Provider): Promise<Provider> => {
  const responseInsert = await ProviderModel.create(item)
  return responseInsert
}

const getProviders = async (): Promise<Provider[]> => {
  const response = await ProviderModel.find({})
  return response
}

const getProvider = async (id: Types.ObjectId): Promise<any> => {
  const response = await ProviderModel.find({ _id: id })
  return response
}

const updateProvider = async (id: Types.ObjectId, item: Provider): Promise<any> => {
  const response = await ProviderModel.updateOne({ _id: id }, { $set: item })
  return response
}

export { getProvider, getProviders, insertProvider, updateProvider }
