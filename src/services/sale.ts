import { Types } from 'mongoose'
import { Sale } from '../interfaces/sale.interface'
import SaleModel from '../models/sale'

const insertSale = async (item: Sale): Promise<Sale> => {
  const responseInsert = await SaleModel.create(item)
  return responseInsert
}

const getSales = async (input: string): Promise<Sale[]> => {
  const query: any = {
  }

  if (input !== '') {
    query.cliente = {
      $regex: input,
      $options: 'i'
    }
  }

  const response = await SaleModel.aggregate([{
    $match: query
  },
  {
    $sort: { createdAt: -1 }
  }
  ])

  return response
}

const getSalesLimit = async (skip: number, limit: number): Promise<Sale[]> => {
  const response = await SaleModel.find({}).skip(skip).limit(limit).sort({ createdAt: -1 })
  return response
}

const getSale = async (id: Types.ObjectId): Promise<Sale[]> => {
  const response = await SaleModel.find({ _id: id })
  return response
}

const updateSale = async (id: Types.ObjectId, sale: Sale): Promise<any> => {
  console.log('service', sale)
  const response = await SaleModel.updateOne({ _id: id }, { $set: sale })
  return response
}

const qtySale = async (): Promise<any> => {
  const response = await SaleModel.countDocuments()
  return response
}

export { insertSale, getSale, getSales, updateSale, qtySale, getSalesLimit }
