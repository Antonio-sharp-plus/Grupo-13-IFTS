const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOSTNAME = '127.0.0.1';

Server.listen(PORT, HOSTNAME, () => {
    console.log('El servidor está corriendo en http://${HOSTNAME}:${PORT}/')
});
