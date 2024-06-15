import express from "express";
import todoRoutes from "./routes/todo";
const app = express();
app.use(express.json());
app.use(todoRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
