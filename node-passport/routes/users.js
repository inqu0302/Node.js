import express from "express";
import passport from "passport";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// http:localhost/users 응답
router.post("/", (req, res) => {
  // 로그인이 수행되어서 session이 유효한 경우에는
  // req.user 속성이 존재한다
  // 로그인이 안되거나 session 이 유효하지 않으면
  // req.user 가 없다
  if (req.user) {
    console.log("session OK");
    res.json(res.ser);
  } else {
    res.json([]);
  }
});

/**
 * react 와 nodejs API 연동하여 login 구현하기
 * login router는 반드시 POST 방식으로 구현해야 한다
 * oAuth2.0 passport 방식으로 login 할때는 정책상 반드시 POST로 요청을 해야한다.
 *
 * passport 를 사용하여 Login을 수행할때 router의 path와 callback 함수사이에서
 * login 정책을 수행할 미들웨어
 * passport.authenticate("local")
 */
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  res.json({ userid: req.user.userid, password: req.user.password });
});

/**
 * 클라이언트에서 서버로 데이터를 전송하는 방법
 * queryString: 주소창에서 ?변수1=값&변수2=값 과 같은형식을 전송
 * 		http://localhost:8080/user?id=root&password=1234
 * 		보안에 취약함
 * 		서버에서 받을때 req.query.변수명
 * pathVarriable : 주소창에 URL과 섞어서 보내는 방식
 * 		http://localhost:8080/user/root/1234
 * 		서버에서 받을때 req.qarams.변수
 *
 * POST로 전송된 데이터는 전송되는 순간 노출을 최소화할수 있다
 * 		https를 사용하면 데이터가 암호화 되어 전송된다
 * 		서버에서 받을대 req.body.변수
 */
router.post("/join", passport.authenticate("local"), (req, res) => {
  res.json({
    userid: req.body.userid,
    password: req.body.password,
    eMail: req.body.eMail,
  });
  console.log("join", req.body);

  const userVO = new user(req.body);

  userVO.save((err, data) => {
    res.json(data);
  });
});

export default router;
