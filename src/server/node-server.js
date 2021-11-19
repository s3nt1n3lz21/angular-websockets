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
  ws.send(JSON.stringify({'message' : 'hello'}));
  console.log('connected to websocket client')
}

onMessage = (messageAsString, ws) => {
  console.log('message recieved from client: ', messageAsString)
  // Convert the JSON string message into a JSON object
  const message = JSON.parse(messageAsString);
  const outboundMessage = JSON.stringify({'message' : message.message + ' something'});
  // Send a message back in JSON form to the websocket client
  ws.send(outboundMessage);
}

onError = () => {
  console.log('error occurred');
}

onClose = () => {
  console.log('websocket closed');
}

console.log('Websocket server running');