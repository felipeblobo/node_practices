const http = require('http');
const url = require('url');
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const params = queryString.parse(url.parse(req.url, true).search);
  let answer = '';

  if(params.question == 'bestmovie') {
    answer = 'Matrix';
  }  else {
    answer = 'Pergunte em outro lugar!';
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(answer)
})

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}`);
})