
/*
 * Source code from node-usb-barcode-scanner
 *  -> https://github.com/harmon25/node-usb-barcode-scanner
 *
 * Thanks to harmon25
 *  -> https://github.com/harmon25
 *
 * Edited by supermomme
 *  -> https://github.com/supermomme
 *
*/

var HID = require('node-hid');
var events = require('events');
var util = require('util');

/*
options:
{hidMap: Obj}
defaults:
{hidMap:{30: '1', 31: '2', 32: '3', 33: '4',34: '5',35: '6', 36: '7', 37: '8', 38: '9',39: '0',40: 'e'}}
*/
function usbScanner(path, options){
  var opts = options || {};
  if (path === undefined) {
    throw 'No Path defined';
    return;
  }
  this.init(path, opts);
  events.EventEmitter.call(this);
}

//enherit event emitter
util.inherits(usbScanner, events.EventEmitter);

function getDevices(){
  var devices = HID.devices();
  return devices;
}

usbScanner.prototype.init = function(path, options){
  //hidMap defining keyboard code to coresponding string value
  this.hidMap = options.hidMap || {
    4:'A', 5:'B',6:'C',7:'D',8:'E',
    9:'F', 10:'G', 11:'H',12:'I',13:'J',
    14:'K',15:'L',16:'M',17:'N', 18:'O',
    19:'P',20:'Q',21:'R',22:'S',23:'T',
    24:'U',25:'V', 26:'W', 27:'X', 29:'Y',
    28:'Z',30: '1', 31: '2', 32: '3', 33: '4',
    34: '5',35: '6', 36: '7', 37: '8', 38: '9',
    // enter - barcode escape char
    39: '0',40: 'enter',44:' ',45:'-', 55:'.', 56:'/',
    85:'*', 87:'+'
  };

  var device = new HID.HID(path);
  // start waiting for scan events
  this.startScanning(device);
};

usbScanner.prototype.startScanning = function(device){
  var hidMap = this.hidMap;
  //empty array for barcode bytes
  var bcodeBuff = [];
  //string variable to hold barcode string
  var aBarcode = '';
  //event emitter for when newCode is read from scanner
  var getCode = (code) => {
    this.emit('data', code);
  };

  device.on('data', function(chunk) {
    //second byte of buffer is all that contains dataSCANNERßAUSGANG
    if (hidMap[chunk[2]]) {
      //if not bcodeBuff escape char (40)
      if (chunk[2] !== 40) {
        bcodeBuff.push(hidMap[chunk[2]]);
      } else {
        //revieved escape code, join bCodebuff array and
        aBarcode = bcodeBuff.join('');
        bcodeBuff = [];
        //emit newCode event
        getCode(aBarcode);
      }
    }
  });
};

module.exports = {usbScanner:usbScanner, getDevices:getDevices};
