# nodejs프로젝트

- https:// nodejs.org 사이트에서 nodejs 다운로드 받아 설치하기
- 특별한 경우가 아니면 버전의 첫번째 숫자가 짝수인 버전을 다운받는다
- nodejs 설치후 cmd창을 관리자 권한으로 열어서 plugin 설치

## NPM(Nodejs Package Manager)

- cmd창에서 실행할 수 있는 명령
- npm install 패키지명 형식으로 명령을 입력하여 필요한 dependency, plungin 등을 설치한다
- 시스템에 공통으로 사용되는 plugin 들은 npm install -g plugin 형식으로 명령을 입력한다

## 최초에 설치할 Package(plugin)

- cmd 창에서 관리자로 접속 : npm install -g 패키지명

* nodemon : nodejs 코드를 작성하고 저장을 하면 자동으로 재 실행하여 결과를 확인할 수 있도록 도와주는 plugin
* express-generator : nodejs + express 프레임 워크 서버 어플리케이션을 작성할 때 사용하는 plugin
* create-react-app : React 기반의 프론트 프로젝트를 작성할 때 사용하는 plugin
* yarn : React project를 만들어서 개발을 할때 npm을 대신 하여 사용하는 package관리자

## nodejs 프로젝트 생성하기

1. 매우 고전적인 방법

   > mkdir 프로젝트 명
   > cd 프로젝트 명
   > npm init -y

2. express-generator를 이용하여 백앤드 프로젝트를 만드는 방법

   > express 프로젝트명
   > cd 프로젝트 명
   > npm install

3. create-react-app을 이용한 React 프론트앤드 프로젝트 만드는 방법
   > create-react-app 프로젝트
   > cd 프로젝트
   > yarn
