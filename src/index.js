const http = require("http");
const getUsers = require("./modules/users");
require("dotenv").config;
//const hostname = "127.0.0.1";
//const port = 3003;
const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const params = url.searchParams;
  const name = params.get("hello");
  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    (response.setHeader = "Content-Type"), "text/plain";
    response.write("Hello world!");
    response.end();
    return;
  }
  if (name) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, ${name}.`);
    response.end();
  }
  if (request.url === "/hello") {
    response.statusCode = 400;
    response.statusMessage = "Bad Request";
    response.header = "Content-Type: text/plain";
    response.write("Enter a name");
    response.end();
  } else if (request.url === "/users") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
  } else {
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/plain");
    response.end();
    return;
  }
});

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log(
    `Сервер запущен по адресу http://${process.env.HOSTNAME}:${process.env.PORT}/`
  );
});
