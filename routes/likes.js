const express = require('express');
const Like = require('../models/like');

const router = express.Router();

//경로 라우팅
//좋아요 데이터 생성
  router.post('/likes', async (req, res, next) => {
    try {
      
      //liked 값 확인
      //liked true인 경우
      if(req.body.liked) {
          const like = await Like.create({ liked: true });
          res.json(like);
      } 

      //liked false인 경우
      else {
          res.status(400).json("liked is not true");
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  //데이터 가져오기
  router.get('/count', async (req, res, next) => {
    try {

      //데이터 검색
      const count = await Like.count({ where: { liked: true } });
      res.json({ count });
    } catch (err) {
      console.error(err);

      //json 형식으로 응답
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;