const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(process.argv[2] || process.cwd());
const port = 4173;
const host = "127.0.0.1";
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".md": "text/markdown",
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";

    const filePath = path.join(root, urlPath);
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (!error) {
        res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
        res.end(data);
        return;
      }

      if (!path.extname(urlPath)) {
        fs.readFile(path.join(root, "index.html"), (indexError, indexData) => {
          if (indexError) {
            res.writeHead(500);
            res.end("Could not load application shell");
            return;
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(indexData);
        });
        return;
      }

      res.writeHead(404);
      res.end("Not found");
    });
  })
  .listen(port, host, () => {
    console.log(`FG Lab serving ${root} on http://${host}:${port}`);
  });
