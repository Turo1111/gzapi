import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { getDailyData, getWeeklyData, getMonthlyData, getAnnuallyData, getDailyDataGraph, getWeeklyDataGraph, getMonthlyDataGraph, getAnnuallyDataGraph, bestSelling, highProfit, dataProduct, getCustomData, getCustomDataGraph } from '../services/dataset'

const dailyCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    const response = await getDailyData()
    const response2 = await getDailyDataGraph()
    console.log({ simple: response, graph: response2 })
    res.send({ simple: response, graph: response2 })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_DAILY_DATA')
  }
}

const weeklyCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    const response = await getWeeklyData()
    const response2 = await getWeeklyDataGraph()
    res.send({ simple: response, graph: response2 })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_WEEKLY_DATA')
  }
}

const monthlyCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    const response = await getMonthlyData()
    const response2 = await getMonthlyDataGraph()
    res.send({ simple: response, graph: response2 })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_MONTHLY_DATA')
  }
}

const annuallyCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    const response = await getAnnuallyData()
    const response2 = await getAnnuallyDataGraph()
    res.send({ simple: response, graph: response2 })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ANNUALLY_DATA')
  }
}

const customCtrl = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { start, end } = params
    const response = await getCustomData(start, end)
    const response2 = await getCustomDataGraph(start, end)
    res.send({simple: response, graph: response2})
  } catch (e) {
    handleHttp(res, 'ERROR_GET_ANNUALLY_DATA')
  }
}

const bestSellingCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    const response = await bestSelling()
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_BEST_SELLING')
  }
}

const highProfitCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    const response = await highProfit()
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_BEST_SELLING')
  }
}

const dataProductCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    const response = await dataProduct()
    res.send(response)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_BEST_SELLING')
  }
}

export { dailyCtrl, weeklyCtrl, monthlyCtrl, annuallyCtrl, bestSellingCtrl, highProfitCtrl, dataProductCtrl, customCtrl }
