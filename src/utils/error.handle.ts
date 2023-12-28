import { Response } from 'express'

const handleHttp = (res: Response, error: string, errorRaw?: any): void => {
  console.log("error",errorRaw)
  res.status(500)
  res.send({ error })
}

export { handleHttp }
