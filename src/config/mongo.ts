import 'dotenv/config'
import { connect } from 'mongoose'

async function dbConnect (): Promise<void> {
  const MONGODB_URI = process.env.MONGODB_URI as string
  await connect(MONGODB_URI)
}

export default dbConnect
