# NodeJS + Express + Pug 연동

## POS Project

## project 생성

- express --view=pug nodejs_bPOS

## package.json dependency update

- 설정되어있는 dependency 의 버전번호를 \* 로 변경
- dependency update
  npm install cookie-parser
  npm install debug
  npm install express
  npm install http-errors
  npm install morgan
  npm install pug

## 우리동네 김밥천국 프로젝트 요구사항

- 첫화면에서 매장의 table layout 보여주기
- table layout에서 table을 클릭하면 주문서 작성화면으로 전환
- 주문서 작성화면에서 상품(메뉴)항목을 클릭하면 주문서에 추가
- 결제(현금, 카드)를 수행하면 결제화면 popup
- 결제완료가 되면 메시지 출력

### 첫화면의 table layout 보여주기

- 어떤 UI(table, div 등) tag 로 화면을 그릴것인가
- 클릭을 했을때 서버와 데이터를 어떻게 통신하고 화면전환을 할것인가
- a tag와 script중 어떤것을 사용할지 선택

### 주문서 작성화면 보여주기

- table의 주문내용을 보여주고 메뉴 추가 가능
- 비어있는 테이블인지 보여주고 메뉴 주문가능
- 주문메뉴를 클릭하면, 메뉴 ID를 fetch 를 사용하여 서버로 전송하고, 상품 테이블에서 상품을 검색하고, 해당되는 상품정보를 수신하여 리스트에 표현

### 도메인주도형 개발

- 데이터 주도형 개발 : 데이터베이스를 먼저 설계하고, 데이터를 사용하여 view를 구현하는 코드
- 데이터베이스가 잘못 설계되면 중간에 다시 재 설계하는 비용이 막대하게 소모된다
- 이를 방지하기 위해 도메인 주도형을 선호하는 추세이다
- 도메인 주도형 개발 : 어떤일을 어떻게 어떤 방식으로 어떤 순서로 처리할 것인가를 먼저 설계하고, 코드를 작성후 데이터를 생성

### mySQL 연동을 위하여 dependency 설치

- npm install sequlize
- npm install mysql2

### sequlize-cli 를 이용한 초기화

- 프로젝트 폴더 > sequelize init

### 주문서 처리하기

1. 주문서 화면에서 메뉴를 클릭 - menu_id 서버로 전송
2. menud_id 로 데이터 조회
3. 배열에 담아 view 로 전송

   - 임시 order table에 데이터 insert
   - table_id, menu_id, 가격, 수량 등의 정보를 저장
   - 결제여부 확인후 결제완료여부 표시, 결제가 미완료시
     주문진행중이므로 언제든지 리스트를 보여줄수 있어야 한다

   - table에 담긴 데이터를 select 하여 view로 전송
