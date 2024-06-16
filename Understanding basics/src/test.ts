console.clear();
import * as http from "http";

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.write("<h1 style='color:green'>Node form</h1>");
    res.write(
      "<form method='POST' action='/create-user' > <input name='user' /><button>submit</button> </form>"
    );
    return res.end();
  }
  if (url === "/users") {
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>User 1 </li>");
    res.write("<li>User 2 </li>");
    res.write("<li>User 3 </li>");
    res.write("<li>User 4 </li>");
    res.write("</ul>");
    res.write("</body>");

    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body: Uint8Array[] = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("=")[1];
      console.log(data);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.write("<h1>404-Page not found</h1>");
  res.end();
});
server.listen(3000, () => {
  console.log("listening on port 3000");
});
