import { Types } from 'mongoose'
import { Sale } from '../interfaces/sale.interface'
import SaleModel from '../models/sale'

const insertSale = async (item: Sale): Promise<Sale> => {
  const responseInsert = await SaleModel.create(item)
  return responseInsert
}

const getSales = async (): Promise<Sale[]> => {
  const response = await SaleModel.find({})
  return response
}

const getSale = async (id: Types.ObjectId): Promise<Sale[]> => {
  const response = await SaleModel.find({ _id: id })
  return response
}

export { insertSale, getSale, getSales }
