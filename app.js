const http = require('http');

const server = http.createServer((req, res) => {
  res.write("Hello CI/CD with Docker 🚀");
  res.end();
});

server.listen(3000);