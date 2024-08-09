import { Types } from 'mongoose'
import { Buy } from '../interfaces/buy.interface'
import BuyModel from '../models/buy'

const insertBuy = async (item: Buy): Promise<Buy> => {
  const responseInsert = await BuyModel.create(item)
  return responseInsert
}

const getBuys = async (): Promise<Buy[]> => {
  const response = await BuyModel.find({})
  return response
}

const getBuy = async (id: Types.ObjectId): Promise<Buy[]> => {
  const response = await BuyModel.find({ _id: id })
  return response
}

export { insertBuy, getBuys, getBuy }
