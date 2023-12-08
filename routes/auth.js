const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// controllers/auth.js에서 login 함수에서
exports.login = async (req, res, next) => {
  const { id, password } = req.body;

  const user = await User.findOne({ where: { id } });
  if (!user || !user.validPassword(password)) {
    // 로그인 실패
    return res.redirect('/login');
  }

  // 로그인 성공
  req.session.nick = user.nick;
  res.redirect('/joins');
};

// POST /auth/join
router.post('/join', isNotLoggedIn, join); 

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

module.exports = router;