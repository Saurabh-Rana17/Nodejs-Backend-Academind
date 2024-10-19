const express = require("express");
const { getStatus, updateStatus } = require("../controllers/status");
const { isAuth } = require("../middlewares/isAuth");
const router = express.Router();

router.get("/status", isAuth, getStatus);
router.put("/status", isAuth, updateStatus);

module.exports = router;
