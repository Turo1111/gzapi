import { Types } from 'mongoose'
import { ItemSale } from '../interfaces/sale.interface'
import ItemSaleModel from '../models/itemSale'

const insertItemSale = async (item: ItemSale): Promise<ItemSale> => {
  const responseInsert = await ItemSaleModel.create(item)
  return responseInsert
}

const getItemSales = async (): Promise<ItemSale[]> => {
  const response = await ItemSaleModel.find({})
  return response
}

const getItemSale = async (id: Types.ObjectId): Promise<any> => {
  const response = await ItemSaleModel.find({ _id: id })
  return response
}

export { insertItemSale, getItemSales, getItemSale }
