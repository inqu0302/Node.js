// express framework의 객체 선언
const express = require("express");

// express framework에서 routin을 수행하기 위한 sub 객체 선언
const controller = express.Router();

/* GET home page. */
controller.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

controller.get("/home", function (req, res, next) {
  res.send("Hello Korea");
});

controller.get("/json", function (req, res) {
  let mData = {
    name: "홍길동",
    tel: "010-111-222",
    age: 33,
  };
});

// 다른 js에서 사용할수 있도록 module화 시켜서 내보내기
module.exports = controller;
