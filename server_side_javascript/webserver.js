

const http = require('http');
	// Node.js에서 만든 기본적인 웹서버
	// require('http'); -> Node js 에서 만든 http라는 모듈을 요구하다.
	// require함수가 실행되면 http라는 모듈을 가져와 사용할 수 있도록하는것이 이 코드의 핵심.
	// 그리고, return 값을 http에 담는다.
	// const = constant의 약자
	// javascript에서 사용하는 상수
	// 상수 - 한번 할달이 되면 그다음부턴 그 할당된 값을 바꿀 수 없는 값을 의미한다.
	// 한번 모듈을 load해오면 바꿀 이유가 없기 때문에 상수처리 해놓는 것임.

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
});