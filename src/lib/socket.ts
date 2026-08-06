// src/lib/socket.ts
import { io as ClientIO } from 'socket.io-client'

let socket: ReturnType<typeof ClientIO> | null = null
export function getSocket() {
  if (!socket) {
    socket = ClientIO(process.env.NEXT_PUBLIC_SOCKET_URL || '')
  }
  return socket
}
