const express = require('express');

const server = express();

server.use(express.json());

server.get('/desafio01',(req, res) => {
  return res.json({ message: 'Hello World' });
})


// http://localhost:3000/
server.listen(3000);

