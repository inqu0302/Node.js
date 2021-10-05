const express = require("express");
const router = express.Router();

// locallhost:3000/api/
router.get("/", (req, res) => {
  res.send("OK");
});

router.get("/text", (req, res) => {
  res.send("대한민국");
});

// router 밖에서 선언된 객체이기 때문에
// 어떤 router 요청이어도 사용가능한 module public 객체가 된다
const mJSON = {
  j_name: "홍길동",
  j_addr: "서울시",
  j_tel: "010-1234-5678",
};

router.get("/json", (req, res) => {
  // 이미 선언된  mJSON 객체에 j_age 값을 추가
  // 현재 mJSON 객체는 const(상수) 로 선언되어 있다
  // 객체에 요소를 추가하는 것은 허용이 되지만 객체를 변형하고나
  // 다른것으로 재 선언할 수 없다.
  // mJSON = { name : "성춘향"} 과 같이 재선언은 불가
  mJSON.j_age = 33;
  mJSON.j_name = "이몽룡";
  console.log(mJSON);
  res.json(mJSON);
});

module.exports = router;
