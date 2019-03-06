#!/usr/bin/env node
const http = require('http');

const port = Number(process.argv[2]);

const server = http.createServer(function(req, resp) {
  resp.end(`<!doctype html>
<html>
  <head>
    <title>stephensorensen.com</title>
    <style>
      :root {
        background: #111;
        color: #aaa;
      }
      html, body {
        padding: 0;
        margin: 0;
      }
      textarea {
        box-sizing: border-box;
        margin: 0;
        background: transparent;
        color: inherit;
        font-family: monospace;
        font-size: 1rem;
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        border: 0;
      }
    </style>
  </head>
  <body>
    <textarea>// TODO: create website



























































</textarea>
  </body>
</html>`);
});

server.listen(port, function() {
  console.log(`Listening @ http://localhost:${port}/`);
});
