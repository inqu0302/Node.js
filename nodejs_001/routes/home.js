const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Requblic of Korea");
});

router.get("/my", (req, res) => {
  const html = "<div>Korea</div>";
  res.render("home", { nation: "대한민국", html });
});

router.get("/add", (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;

  // 문자열 변수 num1, num2에 담긴 값을 정수로 변환하여 게산후 sum 변수에 저장
  const sum = parseInt(num1) + parseInt(num2);

  // query와 결과를 JSON 데이터 구조로 생성
  const result = {
    num1,
    num2,
    sum,
  };

  // JSON data를 web으로 응답 전송
  res.json(result);
});

router.get("/input", (req, res) => {
  res.render("input");
});

router.post("/input", (req, res) => {
  const name = req.body.name;
  const tel = req.body.tel;
  const age = req.body.age;

  res.json({ name, tel, age });
});

module.exports = router;
