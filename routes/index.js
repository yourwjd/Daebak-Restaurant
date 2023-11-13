//테이블 페이징 코드

const express = require('express');
const User = require('../models/user');
const Like = require('../models/like');
const Reservation = require('../models/reservation');

const router = express.Router();

//index 페이지 라우팅
router.get('/', (req, res) => {
  res.render('index');
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

//좋아요 데이터 생성
router.post('/likes', async (req, res, next) => {
  try {

    //liked true인 경우
    if(req.body.liked) {
        const like = await Like.create({ liked: true });
        res.json(like);
    } 
    
    //liked false인 경우
    else {
        res.status(400).send("liked is not true");
    }
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

module.exports = router;