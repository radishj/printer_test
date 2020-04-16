//start();
let printer = require('./printer');
const http = require('http');
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

http.createServer((request, response) => {
  if (request.method == 'POST') {
    console.log('Got POST')
    var body = ''
    request.on('data', function(data) {
      body += data;
    })
    request.on('end', function() {
      console.log('Got Body:',body);
      var data = JSON.parse(body);
      sleep(500);
      //console.log(JSON.stringify(data,null,'   '));
      //printer.print(data);
      printUSB();
    })
  } else {
    //console.log('GET')
  }
}).listen(8081);
console.log('Listen on: '+8081);

function printUSB()
{
  const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
const device  = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');
 
const options = { encoding: "GB18030" /* default */ }
// encoding is optional
 
const printer = new escpos.Printer(device, options);
 
device.open(function(error){
  console.log('Printing.............');
  printer
  .font('a')
  .align('ct')
  .style('bu')
  .size(1, 1)
  .text('The quick brown fox jumps over the lazy dog')
  .text('敏捷的棕色狐狸跳过懒狗')
  .barcode('1234567', 'EAN8')
  .table(["One", "Two", "Three"])
  .tableCustom(
    [
      { text:"Left", align:"LEFT", width:0.33, style: 'B' },
      { text:"Center", align:"CENTER", width:0.33},
      { text:"Right", align:"RIGHT", width:0.33 }
    ],
    { encoding: 'cp857', size: [1, 1] } // Optional
  )
  .qrimage('https://github.com/song940/node-escpos', function(err){
    this.cut();
    this.close();
  });
});
}