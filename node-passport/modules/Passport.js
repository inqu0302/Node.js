import passport from "passport";
import passportLocal from "passport-local";

// local login 정책을 수행하는 모듈
const LocalStratege = passportLocal.Strategy;

const exportPassport = () => {
  // 로그인이 성공했을때 호출되는 함수
  passport.serializeUser((user, done) => {
    console.log("로그인 성공");
    done(null, user);
  });
  // 로그인 후 client에서 세션이 유효한지 확인할때 실행
  passport.deserializeUser((user, done) => {
    console.log("DES", user);
    done(null, user);
  });

  // 로그인을 실제 수행하는 함수
  passport.use(
    new LocalStratege(
      {
        // login을 수행할때 전달될 변수명 설정
        usernameField: "userid",
        passwordField: "password",
        session: true,
      },

      /**
       * login이 성공했을 경우
       * done() 함수의 2번째 매개변수에 로그인 정보를 담아주면
       * router에서 req.user 객체가 생성되고 로그인한 정보를 추출할 수 있다
       */
      (userid, password, done) => {
        return done(null, { userid: "root", password: "12345" });
      }
    )
  );
};

export default exportPassport;