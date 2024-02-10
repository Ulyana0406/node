const http = require("http");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;
const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const searchParams = url.searchParams;

  for (const [key, value] of searchParams.entries()) {
    if (key === "hello") {
      if (value) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.write(`Hello, ${value}.`);
        response.end();
      } else {
        response.statusCode = 400;
        response.header = "Content-Type: text/plain";
        response.write("Enter a name");
        response.end();
      }
    } else if (key === "users") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(getUsers());
      response.end();
    } else if (key === "") {
      response.statusCode = 200;
      response.header = "Content-Type: text/plain";
      response.write("Hello, World!");
      response.end();
    } else {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end();
      return;
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
