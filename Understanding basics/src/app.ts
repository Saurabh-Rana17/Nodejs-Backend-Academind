console.clear();
import http from "http";
import fs from "fs/promises";

const server = http.createServer((req, res) => {
  const { headers, url, method } = req;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Form</title></head>");
    res.write(
      "<body> <form method='POST' action='/message' > <input name='message' type='text'> <button type='submit'>Send </button>   </form> </body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body: Uint8Array[] = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", async () => {
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("=")[1];
      // fs.writeFileSync("./src/message.txt", data);
      try {
        await fs.writeFile("./src/message", data);
      } catch (error) {
        console.log(error);
      }
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.write("<H1>404 Page not found</h1>");
  res.end();
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
