import express from "express";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
