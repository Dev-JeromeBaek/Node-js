const http = require('http');

const hostname = '127.0.0.1';
const port = 3333;

const server = http.createServer((req, res) => {	
	// createServer라는 함수를 통해 서버를 만든다.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {	
	// 만들어진 서버로 listening을 하게 만든다. 
	// 즉, Node.js를 이용해서 웹서버를 만들고, 
	// 그 웹서버가 3000번 포트를 listening하게 시키는 코드이다.
	// 클라이언트가 127.0.0.1로 접속을때 해당 포트를 응답시키게끔 만드는 명령.
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("Node.js Server Test GitHub");
});