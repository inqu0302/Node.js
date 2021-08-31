const express = require("express");
const { tbl_order, tbl_product } = require("../models/index");
const router = express.Router();

router.get("/order", (req, res) => {
  const table = req.query.t_id;
  console.log(o_table);

  //   tbl_order
  //     .findOne({
  //       where: { o_table : table },
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       res.render("order", { ORDER: result });
  //     });

  tbl_product.findAndCountAll().then((result) => {
    res.render("order", { PD: result });
  });
});

module.exports = router;
