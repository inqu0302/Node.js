const express = require("express");
const router = express.Router();
const moment = require("moment");

const { tbl_product, tbl_table_orders } = require("../models/index");

// localhost:3000/pos/order/3 이라는 URL이 전송되면
// req.params.table_id로 3이라는 값을 가져온다
router.get("/order/:table_id", async (req, res) => {
  const table_id = req.params.table_id;
  //   console.log("table id", table_id);

  // p_name 칼럼을 기준으로 오름차순 정렬
  const MENU = await tbl_product.findAll().then({ order: ["p_name", "ASC"] });
  res.render("order_view", { table_id, MENU });

  // res.render("order_view", { table_id: table_id });
  //   res.render("order_view", { table_id });
});

// 테스트용
// let menu_list = [];

router.get("/order/:table_id/input/:menu_id", (req, res) => {
  const table_id = req.params.table_id;
  const menu_id = req.params.menu_id;

  // 선택된 메뉴를 menu_list에 추가
  tbl_product.findByPk(menu_id).then((product) => {
    // tbl_table_orders에 insert할 데이터 준비
    const table_orders = {
      to_table_id: table_id,
      to_pcode: menu_id,
      to_qty: 1,
      to_price: product.p_price,
      to_date: moment().format("YYYY[-]MM[-]DD"),
      to_time: moment().format("HH:mm:ss"),
    };
    tbl_table_orders.create(table_orders).then((result) => {
      res.json(result);
      //   tbl_table_orders
      //     .findAll({
      //       where: { to_table_id: table_id },
      //       include: [{ model: tbl_product, require: false }],
      //     })
      //     .then((order_list) => {
      //       res.json({ table_id, order_list });
      //     });
    });
  });
});

// table Layout에서 주문화면으로 진입시 현재 table의
// 주문리스트를 출력하기위한 Request 처리
router.get("/getorder/:table_id", (req, res) => {
  const table_id = req.params.table_id;

  tbl_table_orders
    .findAll({
      where: { to_table_id: table_id },
      include: [{ model: tbl_product, require: false }],
    })
    .then((result) => res.json(result));
});

router.get("/order/:order_seq/delete", (req, res) => {
  const order_seq = req.params.order_seq;
  tbl_table_orders
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
  tbl_table_orders
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
