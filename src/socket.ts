import { Server } from 'socket.io'
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  ServerType,
  SocketData
} from '../src/interfaces/Socket.types'

let io: ServerType

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function init (httpServer: any) {
  io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    // @ts-expect-error
    method: 'GET',
    cors: {
      origin: '*'
    }
  })
  return io
}

export function getIO (): ServerType {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!io) {
    throw new Error('Socket IO not defined!')
  }
  return io
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function emitSocket (type: string, params: Object) {
  try {
    console.log(type, params)
    // @ts-expect-error
    getIO().emit(type, params)
  } catch (error) {
    console.log(error)
  }
}
