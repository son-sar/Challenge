// Start the server

const express = require('express');
const app = express();

const PORT = parseInt(process.env.PORT) || 8080;

const Server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

console.log('Server is Running');

module.exports = Server;