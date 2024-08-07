import { Request, Response } from 'express'
import { loginUser, registerNewUser } from '../services/auth'

const registerCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  const responseUser = await registerNewUser(body)
  res.send(responseUser)
}

const loginCtrl = async ({ body }: Request, res: Response): Promise<void> => {
  console.log(body)
  const responseUser = await loginUser(body)
  res.send(responseUser)
}

export { loginCtrl, registerCtrl }
