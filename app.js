//start();
let printer = require('./examples/example');
const http = require('http');

const requestListener = function (req, res) {
  printer.print();
  res.writeHead(200);
  res.end('Print Successfully!');
}

const server = http.createServer(requestListener);
server.listen(8080);