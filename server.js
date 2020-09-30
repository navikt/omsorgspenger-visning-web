const express = require('express');
const path = require('path');
const server = express();
server.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 8090;

server.get('/isAlive', (req, res) => res.sendStatus(200));
server.get('/isReady', (req, res) => res.sendStatus(200));

server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, error => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('Started express server at port ' + PORT);
});
