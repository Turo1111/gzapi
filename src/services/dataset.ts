import BuyModel from '../models/buy'
import SaleModel from '../models/sale'
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, addDays, addWeeks, addMonths, addYears, addHours } from 'date-fns'

interface Response {
  totalSales: number
  salesCount: number
  label: string
}

const getDailyData = async (): Promise<Response[]> => {
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const start = addHours(startOfDay(today), 3)
  const end = addHours(endOfDay(today), 3)

  console.log('daily data', start, end)

  const responseSale = await SaleModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  const responseBuy = await BuyModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  return [
    responseSale[0] ? { ...responseSale[0], label: 'sale', id: 0 } : { totalSales: 0, salesCount: 0, label: 'sale', id: 0 },
    responseBuy[0] ? { ...responseBuy[0], label: 'buy', id: 1 } : { totalSales: 0, salesCount: 0, label: 'buy', id: 1 }
  ]
}

const getWeeklyData = async (): Promise<Response[]> => {
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const start = addHours(startOfWeek(today), 3)
  const end = addHours(endOfWeek(today), 3)

  const responseSale = await SaleModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  const responseBuy = await BuyModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  return [
    responseSale[0] ? { ...responseSale[0], label: 'sale', id: 0 } : { totalSales: 0, salesCount: 0, label: 'sale', id: 0 },
    responseBuy[0] ? { ...responseBuy[0], label: 'buy', id: 1 } : { totalSales: 0, salesCount: 0, label: 'buy', id: 1 }
  ]
}

const getMonthlyData = async (): Promise<Response[]> => {
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const start = addHours(startOfMonth(today), 3)
  const end = addHours(endOfMonth(today), 3)

  const responseSale = await SaleModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  const responseBuy = await BuyModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  return [
    responseSale[0] ? { ...responseSale[0], label: 'sale', id: 0 } : { totalSales: 0, salesCount: 0, label: 'sale', id: 0 },
    responseBuy[0] ? { ...responseBuy[0], label: 'buy', id: 1 } : { totalSales: 0, salesCount: 0, label: 'buy', id: 1 }
  ]
}

const getAnnuallyData = async (): Promise<Response[]> => {
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const start = addHours(startOfYear(today), 3)
  const end = addHours(endOfYear(today), 3)

  const responseSale = await SaleModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  const responseBuy = await BuyModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$total' },
        salesCount: { $sum: 1 }
      }
    }
  ])

  return [
    responseSale[0] ? { ...responseSale[0], label: 'sale', id: 0 } : { totalSales: 0, salesCount: 0, label: 'sale', id: 0 },
    responseBuy[0] ? { ...responseBuy[0], label: 'buy', id: 1 } : { totalSales: 0, salesCount: 0, label: 'buy', id: 1 }
  ]
}

const getDailyDataGraph = async (): Promise<any> => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const todayIndex = (today.getDay() + 6) % 7 // Ajuste para que el lunes sea el día 0, martes el día 1, y así sucesivamente.

  const sales = []
  const buy = []

  for (let i = 0; i < 7; i++) {
    const dayIndex = (todayIndex - todayIndex + i + 7) % 7 // Mantener el cálculo del índice
    const dayOfWeek = addDays(today, i - todayIndex) // Calcula la fecha correspondiente al día de la semana

    const start = addHours(startOfDay(dayOfWeek), 3)
    const end = addHours(endOfDay(dayOfWeek), 3)

    console.log(dayIndex, dayOfWeek, start, end)

    const responseSale = await SaleModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    const responseBuy = await BuyModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    sales.push({
      id: i,
      label: days[dayIndex], // Asignación correcta del día de la semana
      totalSales: responseSale[0]?.totalSales || 0,
      salesCount: responseSale[0]?.salesCount || 0
    })

    buy.push({
      id: i,
      label: days[dayIndex], // Asignación correcta del día de la semana
      totalSales: responseBuy[0]?.totalSales || 0,
      salesCount: responseBuy[0]?.salesCount || 0
    })
  }

  return { sales, buy }
}

const getWeeklyDataGraph = async (): Promise<{ sales: Response[], buy: Response[] }> => {
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const currentMonth = today.getMonth() // Mes actual (0 para enero, 11 para diciembre)

  const sales = []
  const buy = []

  for (let i = 0; i < 4; i++) { // Intentando obtener datos de las últimas 4 semanas
    const start = addHours(startOfWeek(addWeeks(today, -i), { weekStartsOn: 1 }), 3)
    const end = addHours(endOfWeek(addWeeks(today, -i), { weekStartsOn: 1 }), 3)

    // Verificar si la semana pertenece al mismo mes
    if (start.getMonth() !== currentMonth) {
      break // Detener el ciclo si la semana no pertenece al mes actual
    }

    const responseSale = await SaleModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    const responseBuy = await BuyModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    sales.push({
      id: i,
      label: `Semana ${i + 1}`,
      totalSales: responseSale[0]?.totalSales || 0,
      salesCount: responseSale[0]?.salesCount || 0
    })

    buy.push({
      id: i,
      label: `Semana ${i + 1}`,
      totalSales: responseBuy[0]?.totalSales || 0,
      salesCount: responseBuy[0]?.salesCount || 0
    })
  }

  return { sales, buy }
}

const getMonthlyDataGraph = async (): Promise<{ sales: Response[], buy: Response[] }> => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const currentYear = today.getFullYear() // Año actual

  const sales = []
  const buy = []

  for (let i = 0; i < 12; i++) { // Intentando obtener datos de los últimos 12 meses
    const start = addHours(startOfMonth(addMonths(today, -i)), 3)
    const end = addHours(endOfMonth(addMonths(today, -i)), 3)

    // Verificar si el mes pertenece al mismo año
    if (start.getFullYear() !== currentYear) {
      break // Detener el ciclo si el mes no pertenece al año actual
    }

    const responseSale = await SaleModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    const responseBuy = await BuyModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    sales.push({
      id: i,
      label: months[start.getMonth()],
      totalSales: responseSale[0]?.totalSales || 0,
      salesCount: responseSale[0]?.salesCount || 0
    })

    buy.push({
      id: i,
      label: months[start.getMonth()],
      totalSales: responseBuy[0]?.totalSales || 0,
      salesCount: responseBuy[0]?.salesCount || 0
    })
  }

  // Ordenar los datos por mes en orden ascendente
  sales.sort((a, b) => {
    const monthA = months.indexOf(a.label)
    const monthB = months.indexOf(b.label)
    return monthA - monthB
  })

  buy.sort((a, b) => {
    const monthA = months.indexOf(a.label)
    const monthB = months.indexOf(b.label)
    return monthA - monthB
  })

  return { sales, buy }
}

const getAnnuallyDataGraph = async (): Promise<{ sales: Response[], buy: Response[] }> => {
  const today = new Date()
  today.setHours(today.getHours() - 3)
  const sales = []
  const buy = []

  for (let i = 0; i < 5; i++) { // Obteniendo datos de los últimos 5 años
    const start = addHours(startOfYear(addYears(today, -i)), 3)
    const end = addHours(endOfYear(addYears(today, -i)), 3)

    const responseSale = await SaleModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    const responseBuy = await BuyModel.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalSales: { $sum: '$total' }, salesCount: { $sum: 1 } } }
    ])

    sales.push({
      id: i,
      label: `${start.getFullYear()}`,
      totalSales: responseSale[0]?.totalSales || 0,
      salesCount: responseSale[0]?.salesCount || 0
    })

    buy.push({
      id: i,
      label: `${start.getFullYear()}`,
      totalSales: responseBuy[0]?.totalSales || 0,
      salesCount: responseBuy[0]?.salesCount || 0
    })
  }

  // Ordenar los datos por año en orden ascendente
  sales.sort((a, b) => parseInt(a.label) - parseInt(b.label))
  buy.sort((a, b) => parseInt(a.label) - parseInt(b.label))

  return { sales, buy }
}

export { getDailyData, getWeeklyData, getMonthlyData, getAnnuallyData, getDailyDataGraph, getWeeklyDataGraph, getMonthlyDataGraph, getAnnuallyDataGraph }
