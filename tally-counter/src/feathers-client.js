import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
console.log(process.env)
const socket = io('http://10.64.150.247:3030', {transports: ['websocket']})

const feathersClient = feathers()
  .configure(socketio(socket))

feathersClient.service('statistics').on('patched', console.log)
export default feathersClient
