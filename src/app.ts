import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import db from './config/mongo'
import { init } from './socket'

const PORT = process.env.PORT ?? 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

db().then(() => console.log('Conexion lista')).catch((e) => console.log('Ocurrio un error en la conexion con la bd', e))

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
  const io = init(server)
  io.on('connection', () => {
    console.log('Client connected!')
  })
})
