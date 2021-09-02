const express = require("express");
const router = express.Router();

const { tbl_table_orders, sequelize } = require("../models/index");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const TABLE_COUNT = 12;
  const tables_layout = [];

  /**
	 * SELECT to_table_id, count(to_table_id) AS count
		FROM tbl_table_orders
		WHERE to_pay IS NULL
		GROUP BY to_table_id;
	 */
  // 1. table_orders 에 현재 주문이 있는지 확인하기 위하여 SELECT
  const table_order_count = await tbl_table_orders.findAll({
    attributes: [
      // SELECT to_table_id
      "to_table_id",
      //count(to_table_id) AS count
      [sequelize.fn("count", sequelize.col("to_table_id")), "count"],
    ],
    where: { to_pay: null },
    group: "to_table_id",
  });

  for (let index = 0; index < TABLE_COUNT; index++) {
    /**
     * table_order_count를 for문으로 돌려서
     * to_table_id 와 index+1 과 같은 값이 있으면 result값을 리턴
     *
     * table 1, table 2 에 주문이 있다면
     * table_order_count 리트스중에서 해당 데이터가 있는지 찾아 달라
     */
    const result = await table_order_count.find((order) => {
      return order.dataValues.to_table_id == index + 1;
    });

    const table_data = {
      id: index + 1,
      table_name: index + 1 + "번 테이블",
    };

    // table_id가 일치하는 데이터를 찾앗다
    if (result) {
      table_data.order_count = result.dataValues.count;
    } else {
      table_data.order_count = 0;
    }
    console.log(table_data);
    tables_layout.push(table_data);
  }

  console.log(tables_layout);
  res.render("index", { TABLES: tables_layout });
});

module.exports = router;
