const passport = require('passport');

const local = require('./localStrategy');
const Join = require('../models/join');

module.exports = () => {
    // 로그인 정보
  passport.serializeUser((user, done) => {
    done(null, user.userName);
  });

  //userName 정보
  passport.deserializeUser((userName, done) => {
    Join.findOne({ where: { userName } })
    //useer에 저장
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};