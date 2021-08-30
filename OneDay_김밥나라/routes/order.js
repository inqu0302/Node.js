const express = require("express");
const tbl_product = require("../models/tbl_product");
const tbl_orders = require("../models/tbl_orders");
const router = express.Router();

router.get("/order", (req, res) => {
  const o_table = req.query.t_id;

  tbl_orders
    .findOne({
      where: { o_table },
    })
    .then((result) => {
      res.render("order", { ORDER: result });
    });

  tbl_product.findAndCountAll().then((result) => {
    res.render("product", { PD: result });
  });
});

module.exports = router;
