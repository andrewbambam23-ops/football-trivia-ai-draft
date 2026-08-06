// src/pages/api/socket.ts
import { Server } from 'socket.io'

export default function handler(req:any, res:any) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('socket connected', socket.id)
      socket.on('join', (room) => {
        socket.join(room)
      })
      socket.on('pick', (data) => {
        io.to(data.room).emit('pick', data)
      })
    })
  }
  res.end()
}
