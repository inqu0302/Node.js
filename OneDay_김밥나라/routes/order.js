const express = require("express");
const tbl_product = require("../models/tbl_product");
const router = express.Router();

router.get("/order", (req, res) => {
  const o_table = req.query.t_id;

  tbl_orderes
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
