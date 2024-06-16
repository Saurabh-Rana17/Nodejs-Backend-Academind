console.clear();
import * as http from "http";
import { requestHandler as routes } from "./routes";
const server = http.createServer(routes);

server.listen(3000, () => {
  console.log("listening on port 3000");
});
