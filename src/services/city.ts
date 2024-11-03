import { Types } from 'mongoose'
import { City } from '../interfaces/client.interface'
import CityModel from '../models/city'

const insertCity = async (item: City): Promise<City> => {
  const responseInsert = await CityModel.create(item)
  return responseInsert
}

const getCitys = async (): Promise<City[]> => {
  const response = await CityModel.find({})
  return response
}

const getCity = async (id: Types.ObjectId): Promise<any> => {
  const response = await CityModel.find({ _id: id })
  return response
}

const updateCity = async (id: Types.ObjectId, item: City): Promise<any> => {
  const response = await CityModel.updateOne({ _id: id }, { $set: item })
  return response
}

export { insertCity, getCitys, getCity, updateCity }
