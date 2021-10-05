const express = require("express");
const router = express.Router();
const moment = require("moment");

const { tbl_product, tbl_orders } = require("../models/index");

router.get("/order/:table_id", async (req, res) => {
  const table_id = req.params.table_id;

  // p_name 칼럼을 기준으로 오름차순 정렬
  const MENU = await tbl_product.findAll().then({ order: ["p_name", "ASC"] });
  res.render("order_view", { table_id, MENU });
});

router.get("/order/:table_id/input/:menu_id", async (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;
  const menu = await tbl_product.findByPk(menu_id);

  // 선택된 상품이 order list에 있는지를 검사하기 위해서
  // table_orders에서 데이터 select하기
  const table_order = await tbl_orders.findOne({
    where: { to_table_id: table_id, to_pcode: menu_id, to_pay: null },
  });

  // table_order의 결과가 있으면(Not Null 이면)
  // 수량만 ++ 하여 update 수행
  if (table_order) {
    const order_qty = table_order.dataValues.to_qty;
    const order_seq = table_order.dataValues.to_seq;

    // select 한 결과에 update 수행
    const result = await table_order.update(
      { to_qty: order_qty + 1 },
      { where: { to_seq: order_seq } }
    );
    res.json(result);
  } else {
    const table_order_menu = {
      to_table_id: table_id,
      to_pcode: menu_id,
      to_qty: 1,
      to_price: menu.p_price,
      to_date: moment().format("YYYY[-]MM[-]DD"),
      to_time: moment().format("HH:mm:ss"),
    };

    const result = tbl_orders.create(table_order_menu);
    res.json(result);
  }
});

router.get("/order/:table_id/getlist", (req, res) => {
  const table_id = req.params.table_id;

  tbl_orders
    .findAll({
      where: { to_table_id: table_id, to_pay: null },
      include: [{ model: tbl_product, require: false }],
    })
    .then((result) => res.json(result));
});

router.get("/order/:order_seq/delete", (req, res) => {
  const order_seq = req.params.order_seq;
  tbl_orders
    .destroy({
      where: { to_seq: order_seq },
    })
    .then(() => {
      res.send("OK");
    })
    .catch(() => {
      res.send("FAIL");
    });
});

router.get("/paycomplet/:table_id", (req, res) => {
  const table_id = req.params.table_id;
  // 주문서에 결제와 완료된 표식으로 to_pay 칼럼에 문자열 P 업데이트
  tbl_orders
    .update({ to_pay: "P" }, { where: { to_table_id: table_id } })
    .then((result) => {
      console.log(result);
      res.send("OK");
    })
    .catch(() => {
      res.send("FAIL");
    });
});
module.exports = router;
