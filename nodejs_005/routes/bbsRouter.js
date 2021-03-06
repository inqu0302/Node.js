const express = require("express");
const router = express.Router();

// JS, nodeJS 에서 날짜,시간을 취급하는 가장 많이 사용되는 middelware
const moment = require("moment");

const { tbl_bbs, tbl_reply } = require("../models/index");

// 설정된 root get는 URL 에서 locallhost:3000/bbs/ 요청을 할때
router.get("/write", (req, res) => {
  const BBS = {
    b_date: moment().format("YYYY[-]MM[-]DD"),
    b_time: moment().format("HH:mm:ss"),
  };
  res.render("write", { BBS });
});

router.post("/write", (req, res) => {
  // form을 통해서 POST로 전송된 데이터는 req.body에 담겨서 온다
  tbl_bbs.create(req.body).then((result) => res.redirect("/"));
});

router.get("/detail", (req, res) => {
  // list에서 게시물을 클릭했을때 id(b_id)값을 queryString으로 전달받는다
  const b_id = req.query.b_id;

  // PK를 기준으로 1개의 데이터를 추출하라
  //   tbl_bbs.findByPk(b_id).then((result) => {
  //     console.table(result);
  //     res.render("detail", { BBS: result });
  //   });

  // tbl_bbs 에서 b_id 칼럼값으로 데이터를 1개 SELECT 하고
  // tbl_reply의 r_postId = b_id 로 WHERE 실행하여
  // tbl_reply를 SELECT 하고 그 list를 함께 묶어서 결과로 반환
  tbl_bbs
    .findOne({
      where: { b_id },
      include: { model: tbl_reply },
    })
    .then((result) => {
      res.render("detail", { BBS: result });
    });
});

router.get("/delete", (req, res) => {
  const b_id = req.query.b_id;
  tbl_bbs
    // 데이터를 삭제
    .destroy({
      // b_id 카럼의 값이 변수 b_id에 담긴 값과 같으면
      where: { b_id },

      // 변수명과 값이 같으면 한번 만 적어도됨
      // where: { b_id : b_id },
    })
    .then(() => {
      res.redirect("/");
    });
});

router.get("/update", (req, res) => {
  const b_id = req.query.b_id;

  // PK 또는 일반 칼럼에 조건을 주어 1개의 데이터를 select할때
  // tbl_bbs.findOne({
  //   where : {b_id} -- 무조건 primaryKey로 검색할것
  // })

  tbl_bbs.findByPk(b_id).then((result) => {
    res.render("write", { BBS: result });
  });
});

router.post("/update", (req, res) => {
  const b_id = req.query.b_id;

  req.body.b_id = b_id;
  tbl_bbs.update(req.body, { where: { b_id } }).then((result) => {
    res.redirect("/");
  });
});

router.post("/reply", (req, res) => {
  tbl_reply.create(req.body).then((result) => {
    res.redirect("/bbs/detail?b_id=" + req.body.r_postId);
  });
});

/**
 * HTML에서 서버로 데이터를 보낼때 받는 방법
 *
 * 1. queryString
 * http://localhost:3000/bbs/detail?b_id=3
 * req.query.b_id 로 받기
 * const b_id = req.query.b_id
 *
 * 2. body
 * form의 POST로 전송
 * req.body.b_title, 등으로 받기
 * const b_title = req.body.b_title
 * 데이터를 sequelize를 사용하여 DB에 inser, updqte
 * table.create(req.body), table.updqte(req.body,{b_id})
 *
 * 3. pathVarriable
 * http://localhost:3000/bbs/reply/delete/3
 * router.get("reply/delete/{rid}")로 URL path를 설정
 * req.params.rid 로 데이터를 받는다
 * const rid = req.params.rid와 같이 받는다
 */
router.get("/reply/delete/:rid", (req, res) => {
  const rid = req.params.rid;

  tbl_reply.findByPk(rid).then((result) => {
    const postId = result.r_postId;
    tbl_reply.destroy({ where: { id: rid } }).then(() => {
      res.redirect(`/bbs/detail?b_id=${postId}`);
    });
  });
});

module.exports = router;
