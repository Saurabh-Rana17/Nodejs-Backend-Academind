import * as path from "path";
import express from "express";

const app = express();

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404,Page Not Found" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
