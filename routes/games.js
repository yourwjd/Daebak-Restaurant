const express = require('express');
const Game = require('../models/game');

const router = express.Router();

//경로 라우팅
router.route('/')

//데이터 가져옴
  .get(async (req, res, next) => {
    try {

      //데이터 검색
      const games = await Game.findAll();

      //json 형식으로 응답
      res.json({ games: games, nick: req.session.nick });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

  //데이터 가져옴
  .post(async (req, res, next) => {
    try {
      
      //req.body로부토 데이터 생성
      const game = await Game.create({
        nick: req.body.name,
        msg: req.body.msg,
      });
      console.log(game);

      //json 형식으로 응답
      res.status(201).json(game);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;