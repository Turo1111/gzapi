import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { Types } from 'mongoose'

const JWT_SECRET = process.env.JWT_SECRET ?? 'NOT_TOKEN_ENV'

const generateToken = async (id: string | Types.ObjectId): Promise<string> => {
  const jwt = await sign({ id }, JWT_SECRET)
  return jwt
}

const verifyToken = async (jwt: string): Promise<JwtPayload | string> => {
  const isOk = verify(jwt, JWT_SECRET)
  return isOk
}

export { generateToken, verifyToken }
