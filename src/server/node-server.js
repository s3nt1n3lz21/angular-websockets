// const http = require('http');

// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end('Hello, World!');
// }

// const server = http.createServer(requestListener);
// server.listen(8082);

// Test this by typing the following into your terminal
// curl localhost:8082

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8082 });
  
wss.on('connection', ws => {
  onConnection(ws);
  // wss.emit('test message');
  ws.on('message', message => {
    onMessage(message, ws);
  });
  ws.on('error', error => {
    OnError(error);
  });
  ws.on('close', ws => {
    onClose();
  })
});

onConnection = (ws) => {
  ws.send(JSON.stringify({'id' : 'hello'}));
  console.log('connected to websocket client')
}

onMessage = (messageAsString, ws) => {
  const message = JSON.parse(messageAsString);
  const outboundMessage = JSON.stringify(message);
  // Send a message back to the websocket client
  ws.send(outboundMessage);
  console.log('message recieved');
}

onError = () => {
  console.log('error occurred');
}

onClose = () => {
  console.log('websocket closed');
}

console.log('Websocket server running');