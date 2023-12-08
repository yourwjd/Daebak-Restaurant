//로그인 여부 확인
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('사용자가 로그인되어 있습니다.');
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
  };
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect(`/joins?error=${message}`);
    }
  };
  