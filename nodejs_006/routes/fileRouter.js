const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

/**
 * multer를 사용하여 fileUpload 하기
 */
// 파일의 저장소 정보를 설정하기
const saveOption = multer.diskStorage({
  // 파일이 업로드 된 후 저장소 위치를 지정
  destination: (req, file, cb) => {
    // 현재 폴더(__dirname, routes)에서 cd.. 을 실행하고
    // cd public을 실행하고 cd images를 실행한 곳(폴더)를
    // 저장소로 지정
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  // 파일을 저장할때 해킹에 대비하여
  // 임의의 일련번호를 파일명 앞에 새로 부여
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// ajax를 통해 전달된 upFile에 담긴 파일정보를
// saveOption에 설정된 저장소 정보를 기준으로 저장을 실행
const uploadFile = multer({ storage: saveOption }).single("upFile");

router.post("/fileup", uploadFile, (req, res) => {
  // router.post() 가 실행되는 과정에서 uploadFile midleware가 중간에 실행되면
  // diskStorage에 설정된 정보에따라 실행되면서 새로 생성된 파일이름을
  // req.file.filename에 추가 한다
  res.json({ fileName: req.file.filename });
});

module.exports = router;
