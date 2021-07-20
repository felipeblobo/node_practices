const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3333;

const server = http.createServer((req, res) => {
  const urlparse = (url.parse(req.url, true));
  const params = queryString.parse(urlparse.search);
  let resposta;

  if(urlparse.pathname == "/criar-usuario") {
    
    fs.writeFile('users/' + params.id + 'texto.txt', JSON.stringify(params), (err => {
      if (err) throw err;
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end('User saved!');
  }));
  }  else if (urlparse.pathname =='/selecionar-usuario') {
    fs.readFile('users/' + params.id + 'texto.txt', (err, data) => {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);    
    })
  } else if (urlparse.pathname =='/remover-usuario') {
    fs.unlink('users/' + params.id + 'texto.txt', (err) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      err ? res.end('Usuario n existe') : res.end("Usuario removido!");
      })  
}});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}`);
});