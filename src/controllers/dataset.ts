import { Request, Response } from 'express'
import { handleHttp } from '../utils/error.handle'
import { getDailyData, getWeeklyData, getMonthlyData, getAnnuallyData, getDailyDataGraph, getWeeklyDataGraph, getMonthlyDataGraph, getAnnuallyDataGraph } from '../services/dataset'

const dailyCtrl = async (_: Request, res: Response): Promise<void> => {
  try {
    console.log('daily')
    const response = await getDailyData()
    const response2 = await getDailyDataGraph()
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

export { dailyCtrl, weeklyCtrl, monthlyCtrl, annuallyCtrl }
