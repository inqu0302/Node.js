const express = require("express");
const router = express.Router();
const BBS = require("../models/tbl_bbs");

router.get("/push", (req, res) => {
  const bbsVO = new BBS({
    b_date: "2021-09-03",
    b_time: "11:28:13",
    b_writer: "홍길동",
    b_subject: "오늘은 금요일",
    b_text: "MongoDB 데이터 연동",
  });

  bbsVO.save((err) => {
    if (err) {
      console.log(err);
    }
    res.send("OK");
  });
});

router.get("/push_find", async (req, res) => {
  const bbsVO = {
    b_date: "2021-09-03",
    b_time: "11:42:35",
    b_writer: "성춘향",
    b_subject: "금요일이다",
    b_text: "내일 주말인데 뭐하지",
  };

  //   await BBS.insertMany(bbsVO);
  await BBS.create(bbsVO);
  const result = await BBS.find({});
  await res.json(result);
});

router.post("/write", async (req, res) => {
  await console.table(req.body);
  await BBS.create(req.body);
  const result = await BBS.find({});
  res.json(result);
});

module.exports = router;
