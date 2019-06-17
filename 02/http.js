const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
  const { url, method } = req;
  console.log('cookie',req.headers.cookie);
  console.log('method',method);
  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
        res.end('Server Error 滚吧')
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    core(res);
    res.end(JSON.stringify({ name: 'Wang', age: 22 }))
  }else if(method == 'OPTIONS' && url == '/users'){
    core(res);
    res.end(JSON.stringify({ name: 'Wang', age: 22 }));
  }
})
.listen('3000')

function core (res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:51857');
  res.setHeader('Access-Control-Allow-Headers','X-Token,Content-Type',);
  res.setHeader('Set-Cookie','cookie1=wangbaba');
  res.setHeader('Access-Control-Allow-Credentials','true');
}
