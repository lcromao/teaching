const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

const HOST = "127.0.0.1";
const PORT = Number.parseInt(process.env.PORT || "8000", 10);

const CLIENT_TEMPLATE = path.join(__dirname, "templates", "client.html");

function sendHtml(res, filePath) {
  fs.readFile(filePath, "utf8", (error, content) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Erro ao carregar o template.");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    sendHtml(res, CLIENT_TEMPLATE);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ detail: "Not Found" }));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
