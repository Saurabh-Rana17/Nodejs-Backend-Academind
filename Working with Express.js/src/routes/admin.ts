import express from "express";

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method = "POST" ><input type="text" name="title"> <textarea name="textarea" ></textarea> <button type="submit">Send</button> </form>'
  );
});

router.post("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
