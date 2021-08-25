var express = require("express");
var router = express.Router();

// models 폴더에서 정보를 읽어서 tbl_bbs 객체를 사용할 수 있도록 선언, 초기화
// models 폴더의 index.js 에 table 설정과 관련된 파일을 읽어서 return
// return 된 객체에서 table 객체요소만 추출하여 사용하도록 전개연산을 수행
const { tbl_bbs } = require("../models/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  // 모든데이터를 추출
  tbl_bbs.findAndCountAll().then((result) => {
    console.log(result);
    res.render("index", { BBS: result.rows });
  });
});

module.exports = router;
