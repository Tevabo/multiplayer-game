import 'reflect-metadata'
import setupDb from './db'
import { useKoaServer } from 'routing-controllers'
import * as Koa from 'koa'
import { Server } from 'http'
import * as IO from 'socket.io'

const app = new Koa()
const server = new Server(app.callback())
export const io = IO(server)
const port = process.env.PORT || 4000


useKoaServer(app, {
    cors: true,
    controllers: [

    ],
})

io.on('connection', function (socket) {

    console.log(`User ${socket.id} just connected`)

    socket.on('movePlayer1', state => {
        io.emit('playerOneMoved', state)
    })

    socket.on('movePlayer2', state => {
        io.emit('playerTwoMoved', state)
    })

    socket.on('puckHitGoalOne', score => {
        io.emit('updateScoreOne', score)
    })
    socket.on('puckHitGoalTwo', score => {
        io.emit('updateScoreTwo', score)
    })
    socket.on('resetPuck', score => {
        io.emit('puckHasReset', score)
    })


    socket.on('disconnect', () => {
        console.log(`User ${socket.id} just disconnected`)
    })
})

setupDb()
    .then(_ =>
        server.listen(port, () => console.log(`Listening on server port ${port}`))
    )
    .catch(err => console.error(err)) 