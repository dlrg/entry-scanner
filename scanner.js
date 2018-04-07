var request = require('request');

var scannerToken = { }

function onBarcode(barcode, scannerId) {
    if (scannerToken[scannerId] === null) {
        scannerToken[scannerId] = barcode
        console.log("Scanner scanned token.")
        console.log("Token: ", scannerToken[scannerId])
        return
    }
    console.log(scannerToken[scannerId])
    request.post({url:'http://localhost:3000/api/newEntry', form: {
        token: scannerToken[scannerId],
        barcode
    }}, (err, httpResponse, body) => {
        if (err) throw err
        console.log(body)
    })
}


function onNewScannner(scannerId) {
    console.log("Scanner found!")
    console.log("ScannerId: ", scannerId)
    scannerToken[scannerId] = null
}

console.log("Waiting for Scanner....")
setTimeout(() => {
    onNewScannner('blabla')
    setTimeout(() => {
        onBarcode('89bc0ee758d203568ae827ef41855da7', 'blabla')
        setTimeout(() => {
            onBarcode('blabla ausweis 123', 'blabla')
        }, 2000)
    }, 2000)
}, 2000)