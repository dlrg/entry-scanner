var request = require('request')
var usbScanner = require('./lib/usbscanner').usbScanner
var getDevices = require('./lib/usbscanner').getDevices

var scannerToken = { }

function onBarcode(barcode, scannerPath) {
  if (scannerToken[scannerPath] === null) {
    scannerToken[scannerPath] = barcode
    console.log("New Token:", scannerToken[scannerPath])
    return
  }
  console.log(scannerToken[scannerPath])
  request.post({url:'http://localhost:3000/api/newEntry', form: {
    token: scannerToken[scannerPath],
    barcode
  }}, (err, httpResponse, body) => {
    if (err) throw err
    body = JSON.parse(body)
    console.log("Yay you scanned '" + body.barcode + "' in direction '" + body.direction + "'")
  })
}

function onNewScannner(scannerPath) {
  console.log("New Scanner: ", scannerPath)
  scannerToken[scannerPath] = null
  let scanner = new usbScanner(scannerPath)
  scanner.on('data', (code) => {
    onBarcode(code, scannerPath)
  })
}

function searchForNewDevices() {
  let connectedHidDevices = getDevices().filter(val => val.productId === 1793 && val.vendorId === 9639)
  connectedHidDevices.forEach(device => {
    if (scannerToken[device.path] === undefined) onNewScannner(device.path)
  })
}

setInterval(searchForNewDevices, 5000)
searchForNewDevices()