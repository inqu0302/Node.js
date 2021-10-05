# Nodejs + Express + MongoDB API Server

- view와 독립적인(상관없는) 순수 API Server 실습
- 순수 HTML 에서 서버에 RESTFull 요청을 수행하는 실습

## view + API 의 분리

- 순수 HTML 을 사용하여 view화면(UI)를 디자인하고 JS 파일을 분리하여 script코드를 작성하고
- Server 개발은 별도로 부리하여 수행하는 방식
- 디자이너, Front 개발자, back 개발자 간의 협업이 쉽다
- 개발에 앞서 사용할 변수, HTML 클래스, HTML ID, HTML INPUT 변수명 등을 사전에 협의하여 통일하고
- 반드시 문서를 통하여 개발에 참조할 수 있도록 선행작업을 하는것이 좋다

## nodejs + express 프로젝트 생성후 할 일들

1. dependency upgrade

npm install cookie-parser
npm install debug
npm install ejs
npm install express
npm install http-errors
npm install morgan

## nodejs + MongoDB 연동

- native방식, ORM 방식이 있다
- native 방식 : mongoDB Client를 설정하여 직접 명령을 전달하기
- ORM 방식 : mongoose를 사용하여 modeling 방식으로 사용하기
- mogoose dependency를 설정 : npm install mongoose

### mongoDB Atlas 접속정보

mongodb+srv://inqu0302:<password>@cluster0.fjfsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
