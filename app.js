//start();
let printer = require('./printer');
const http = require('http');

http.createServer((request, response) => {
  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data;
    })
    request.on('end', function() {
      console.log('Got Body');
      data = JSON.parse(body);
      //console.log(JSON.stringify(data,null,'   '));
      printer.print(data);
    })
  } else {
    //console.log('GET')
  }
}).listen(8081);
console.log('Listen on: '+8081);