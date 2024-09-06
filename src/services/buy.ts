import { Types } from 'mongoose'
import { Buy } from '../interfaces/buy.interface'
import BuyModel from '../models/buy'

const insertBuy = async (item: Buy): Promise<Buy> => {
  const responseInsert = await BuyModel.create(item)
  return responseInsert
}

const getBuys = async (input: string): Promise<Buy[]> => {
  const query: any = {
  }

  if (input !== '') {
    query.proveedor = {
      $regex: input,
      $options: 'i'
    }
  }

  const response = await BuyModel.aggregate([{
    $match: query
  }])

  return response
}

const getBuysLimit = async (skip: number, limit: number): Promise<Buy[]> => {
  const response = await BuyModel.find({}).skip(skip).limit(limit)
  return response
}

const getBuy = async (id: Types.ObjectId): Promise<Buy[]> => {
  const response = await BuyModel.find({ _id: id })
  return response
}

const qtyBuy = async (): Promise<any> => {
  const response = await BuyModel.countDocuments()
  return response
}

const updateBuy = async (id: Types.ObjectId, sale: Buy): Promise<any> => {
  const response = await BuyModel.updateOne({ _id: id }, { $set: sale })
  return response
}

export { insertBuy, getBuys, getBuy, getBuysLimit, qtyBuy, updateBuy }
