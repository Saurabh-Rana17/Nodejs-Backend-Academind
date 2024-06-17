import express from "express";
import { Express } from "express";
const app: Express = express();

app.listen(3000, (): void => {
  console.log("App running on Port 3000");
});
