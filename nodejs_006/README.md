## nodejs + express 프로젝트 생성후 할 일들

1. dependency upgrade

npm install cookie-parser
npm install debug
npm install ejs
npm install express
npm install http-errors
npm install morgan

## mysql 프로젝트에서 필요한 dependency

npm install mysql2
npm install sequelize
npm install

## sequelize를 사용하여 자동으로 Table Create 하기

sequelize("테이블이름", { 테이블 칼럼 구조들 })

테이블 이름을 단수로 지정하면 실제 테이블 이름은 복수로 설정되어 만들어 진다

tbl_bbs : tbl_bbs로 table이 생성
tbl_reply : tbl_replies 로 tabe 생성

## table과 table 을 associate(연관)하여 SELECT를 할때

    view에서 처리하는 방법

findOne()을 실행하면서 include로 연관된 list를 포함한다
view에서는 부모 table은 단수 구조로 VO.변수 형식으로 출력하고
include 된 list(forEach)에서는 VO.실제테이블이름.변수 형식으로 사용해야 한다.

# pug view 만들기

## 보간법

- pug template를 사용하여 서버로부터 전달된 데이터를 rendering 하도록 표현하는 문법
- 일반적으로 tag와 함께 : div= 변수명
- #{} 를 사용하는 방법 : div #{변수명}
- !{} 를 사용하는 방법 : div !{변수명}
  - 변수에 포함된 데이터(문자열)에 HTML tag가 포함되어 있고 view 화면에서
    HTML tag 를 적용하여 보여주고 싶을때

## nodejs file upload

- 필요한 dependency : multer
- npm install multer
