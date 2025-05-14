const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOSTNAME = '127.0.0.1';


const server = http.createServer((req, res) => { //para el routing dice gpt que nos conviene usar express en vez de http, despues lo vemos
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('El servidor se inició correctamente.');
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});


/*Server.listen(PORT, HOSTNAME, () => {
    console.log('El servidor está corriendo en http://${HOSTNAME}:${PORT}/')
});
Supuestamente esto no va así xd pero después lo vemos
*/
