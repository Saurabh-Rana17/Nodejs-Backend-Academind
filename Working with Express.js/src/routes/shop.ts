import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("welcome to home route");
});

export default router;
