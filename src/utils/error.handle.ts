import { Response } from 'express'

const handleHttp = (res: Response, error: string, _?: any): void => {
  res.status(500)
  res.send({ error })
}

export { handleHttp }
