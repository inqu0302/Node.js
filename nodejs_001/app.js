/**
 * nodejs 프로젝트에서는 많은 외부 모듈을 import하여 사용하게 된다
 * import 된 모듈을 직접 호출하여 기능을 구현하거나 다른 모듈과 협력하여
 * background에서 작동되기도 한다
 *
 * 모듈을 import하면 프로젝트에서는 미들웨어가 설정(설치)되었다고 한다
 */
var createError = require("http-errors");
var express = require("express");
var path = require("path");

// req에 따라오는 queryString 등을 처리하기 위한 용도
var cookieParser = require("cookie-parser");

// log를 사용하기 위한 용도
var logger = require("morgan");

// localhost:3000/ 요청이 오면
// ./routes 폴더에 있는 index.js 파일을 실행하여 요청을 처리
// spring에서 클래스에 설정된 @RequestMapping에 해당하는 부분
var indexRouter = require("./routes/index");

// localhost:3000/users 요청이 오면
// ./routes 폴더에 있는 users.js 파일을 실행하여 요청을 처리
var usersRouter = require("./routes/users");

const homeRouter = require("./routes/home");

var app = express();

// view engine setup
// nodejs_001/views 폴더 문자열을 생성하기
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/homes", homeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
