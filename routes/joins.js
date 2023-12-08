const express = require('express');
const Join = require('../models/join');

const router = express.Router();

//경로 라우팅
router.route('/')

  //데이터 가져옴 
  .get(async (req, res, next) => {
    try {

      //데이터 검색
      const joins = await Join.findAll();

    //json 형식으로 응답
      res.json(joins);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

  //데이터 가져옴
  .post(async (req, res, next) => {
    try {
      
      //req.body로부토 데이터 생성
      const join = await Join.create({
        userName: req.body.userName,
        password: req.body.password,
        nick: req.body.name,
      });
      console.log(join);

      // 세션에 nick을 저장
      req.session.nick = req.body.name;
      console.log('Session:', req.session);

      res.status(201).json(join);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;