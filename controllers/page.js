
exports.renderJoin = (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
};

exports.renderMain = (req, res, next) => {
  const twits = [];
  res.render('joins', {
    title: 'NodeBird',
    twits,
  });
};