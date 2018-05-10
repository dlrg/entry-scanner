
const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const host = process.argv[2] || 'http://localhost:3030'
console.log(host)
const socket = io(host, {
  transports: ['websocket'],
  forceNew: true
});
const app = feathers();
app.configure(socketio(socket));

// app.service('entry').create({
//   direction: "SCANNER-EINGANG",
//   code: '123',
//   createdAt: new Date()
// });

const {usbScanner, getDevices} = require('./scanner-lib');
const scanners = {};

function onBarcode(code, path) {
  console.log(code, path);
  const scanner = scanners[path];
  if (code === 'SCANNER-EINGANG') {
    scanners[path].direction = 'SCANNER-EINGANG';
    return;
  }
  if (code === 'SCANNER-AUSGANG') {
    scanners[path].direction = 'SCANNER-AUSGANG';
    return;
  }
  if (!scanner.direction) {
    console.log('scanner not configured');
    return;
  }
  app.service('entry').create({
    direction: scanner.direction,
    code,
    createdAt: new Date()
  });

}

function searchForNewDevices() {
  let barcodeScanners = getDevices().filter(d => d.vendorId === 9639 && d.productId === 1793);
  for (let scanner of barcodeScanners) {
    if (!scanners[scanner.path]) {
      registerScanner(scanner);
    }
  }
}

function registerScanner(scanner) {
  console.log('New Scanner: ', scanner.path);
  let newScanner = new usbScanner(scanner.path);
  newScanner.on('data', (code) => onBarcode(code, scanner.path));
  scanners[scanner.path] = {};
}

setInterval(searchForNewDevices, 1000);

