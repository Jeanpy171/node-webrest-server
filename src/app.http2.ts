import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

    //res.write("Hola Mundo");
    //server side rendering
    //   res.writeHead(200, { "Content-Type": "text/html" });
    //   res.write("<h1>Hola Mundo!</h1>");
    //   res.end();
    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlFile);
      // const cssFile = fs.readFileSync("./public/css/style.css", "utf-8");
      // res.writeHead(200, { "Content-Type": "application/javascript" });
      // res.end(cssFile);
      // const jsFile = fs.readFileSync("./public/js/app.js", "utf-8");
      // res.writeHead(200, { "Content-Type": "text/css" });
      // res.end([htmlFile, cssFile, jsFile]);
    }

    if (req.url?.endsWith("css")) {
      //const cssFile = fs.readFileSync("./public/css/style.css", "utf-8");
      res.writeHead(200, { "Content-Type": "text/css " });
      //res.end(cssFile);
    }

    if (req.url?.endsWith("js")) {
      //const jsFile = fs.readFileSync("./public/js/app.js", "utf-8");
      res.writeHead(200, { "Content-Type": "application/javascript" });
      //res.end(jsFile);
    }

    try {
      const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
      res.end(responseContent);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end();
    }

    //   } else {
    //     const data = { name: "Jane Doe", age: 30, city: "New York" };
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify(data));
    //   }
  }
);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
