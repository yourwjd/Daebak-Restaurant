const bcrypt = require('bcrypt');
const passport = require('passport');
const Join = require('../models/join');

exports.join = async (req, res, next) => {
  const { userName, password, nick } = req.body;
  try {
    const exJoin = await Join.findOne({ where: { userName } });
    if (exJoin) {
      return res.redirect('/join?error=이미 가입된 아이디입니다.');
    }
    //비밀번호 암호화
    const hash = await bcrypt.hash(password, 12);
    await Join.create({
      userName,
      password: hash,
      nick,
    });
    return res.redirect('/joins');
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.login = (req, res, next) => {
  //로컬 전략
  passport.authenticate('local', (authError, user, info) => {
    //인증 과정 중 에러
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    //인증 성공 시 유저 정보
    if (!user) {
      return res.redirect(`/joins?error=${info.message}`);
    }
    //유저 정보 저장
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/joins/1');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/joins');
  });
};