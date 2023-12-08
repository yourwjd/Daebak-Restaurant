const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Join = require('../models/join');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: false,
  }, async (userName, password, done) => {
    try {
      //userName 확인
      const exJoin = await Join.findOne({ where: { userName } });
      if (exJoin) {
        //비밀번호 확인
        const result = await bcrypt.compare(password, exJoin.password);
        //일치 시
        if (result) {
          done(null, exJoin);
          //불일치 시
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      //userName 불일치 시
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
