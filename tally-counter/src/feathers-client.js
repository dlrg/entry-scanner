import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io('http://10.64.151.35:3030/', {transports: ['websocket']})

const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient
