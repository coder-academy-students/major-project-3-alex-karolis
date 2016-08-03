// Main starting point of the server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const cors = require('cors');
const io = require('socket.io');
// App Set Up

// Enable cors
app.use(cors()); // can update this to enable only one domain

// Morgan provides logging of incoming requests
app.use(morgan('combined'));

// Body Parser parses incoming requests to json
app.use(bodyParser.json({ type: '*/*' }));

// Call router
router(app);

// Server Set Up

// Set port variable to process.env.PORT if available
const port = process.env.PORT || 3090;

// Create an http server
const server = http.createServer(app);

// Start listening on port
server.listen(port, () => {
  console.log('Server listening on port: ', port);
});

// Set up socket
// 
// io.listen(server);
//
// function handleIO(socket) {
//
//   console.log('client connected');
//
//   socket.on('disconnect', function () {
//     console.log('client disconnected');
//   });
//
//   socket.on('msg', function(broadcast) {
//     socket.broadcast.emit('broadcast', broadcast);
//   });
// }
//
// io.on('connection', handleIO);
