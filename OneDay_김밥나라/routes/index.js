const express = require("express");
const router = express.Router();

const { tbl_order } = require("../models/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
