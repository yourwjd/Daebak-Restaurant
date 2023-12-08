//테이블 페이징 코드

const express = require('express');
const Join = require('../models/join');
const User = require('../models/user');
const Like = require('../models/like');
const Reservation = require('../models/reservation');
const Game = require('../models/game');

const router = express.Router();

//index 페이지 라우팅
router.get('/', (req, res) => {
  res.render('index', { 
    user: req.user, 
  });
});

// /joins 페이지 라우팅
//joins.html
router.get('/joins/:page', async (req, res, next) => {
  
  //페이지 번호
  let page = req.params.page;
  let limit = 10;

  try {
    const result = await Join.findAndCountAll({
      limit: limit,
      offset: limit * (page - 1),
    });

    //정보 전달
    res.render('joins', {
      user: req.user, 
      joins: result.rows,
      totalPage: Math.ceil(result.count / limit),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// /users 페이지 라우팅
//users.html
router.get('/users/:page', async (req, res, next) => {
  
  //페이지 번호
  let page = req.params.page;
  let limit = 10;

  try {
    const result = await User.findAndCountAll({
      limit: limit,
      offset: limit * (page - 1),
    });

    //정보 전달
    res.render('users', {
      users: result.rows,
      totalPage: Math.ceil(result.count / limit),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// /likes 페이지 라우팅
//likes.html
router.get('/likes/:page', async (req, res, next) => {
    
  //페이지 번호
  let page = parseInt(req.params.page, 10) || 1;
  let limit = 10;

  try {
    const result = await Like.findAndCountAll({
      limit: limit,
      offset: limit * (page - 1),
    });

      // 각 like별 count를 가져와서 likes에 추가
      const likesWithCount = await Promise.all(result.rows.map(async like => {
        const count = await Like.count({ where: { id: like.id } });
        like.dataValues.count = count;
        return like;
      }));

    //정보 전달
    res.render('likes', {
      likes: result.rows,
      totalPage: Math.ceil(result.count / limit),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//좋아요 데이터 생성 혹은 업데이트
router.post('/likes', async (req, res, next) => {
  // console.log(req.body);

  // const id = req.body.id.replace(/\D/g, ''); // 'id' 값에서 숫자 부분만 추출
  // const liked = req.body.liked;

  try {
    // // 동일한 'id'를 가진 데이터가 있는지 확인
    // const existingLike = await Like.findByPk(id);
    // if (existingLike) {
    //   // 동일한 'id'를 가진 데이터가 있으면, 'liked' 필드를 업데이트
    //   existingLike.liked = liked;
    //   await existingLike.save();

    const { id, liked } = req.body;

    const like = await Like.create({ id: id, liked: liked });

    // 좋아요 수를 계산
    const likeCount = await Like.count({ where: { id: id, liked: true } });

      res.json({ ...like.get({ plain: true }), likeCount });
    // } else {
    //   // 동일한 'id'를 가진 데이터가 없으면, 새로운 데이터 생성
    //   const like = await Like.create({ id: id, liked: liked });

    //   // 좋아요 수를 계산
    //   const likeCount = await Like.count({ where: { id: id, liked: true } });

    //   res.json({ ...like.get({ plain: true }), likeCount });
    // }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// /reservations 페이지 라우팅
//reservations.html
router.get('/reservations/:page', async (req, res, next) => {
    
  //페이지 번호
  let page = req.params.page;
  let limit = 10;

  try {
    const result = await Reservation.findAndCountAll({
      limit: limit,
      offset: limit * (page - 1),
    });

    //정보 전달
    res.render('reservations', {
      reservations: result.rows,
      totalPage: Math.ceil(result.count / limit),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// games 페이지 라우팅
//games.html
router.get('/games/:page', async (req, res, next) => {
    
  //페이지 번호
  let page = req.params.page;
  let limit = 10;

  try {
    const result = await Game.findAndCountAll({
      limit: limit,
      offset: limit * (page - 1),
    });

    //정보 전달
    res.render('games', {
      games: result.rows,
      totalPage: Math.ceil(result.count / limit),
      nick: req.session.nick, // 세션의 닉네임을 추가
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;