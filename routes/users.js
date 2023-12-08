const express = require('express');
const User = require('../models/user');

const router = express.Router();

//경로 라우팅
router.route('/')
  //데이터 가져옴 
  .get(async (req, res, next) => {
    try {

      //데이터 검색
      const users = await User.findAll();

      // 'created_at' 필드를 'YYYY-MM-DD' 형식으로 변환
      const formattedUsers = users.map(user => {

       //json 형식으로 응답
        const userData = user.toJSON();
        const date = new Date(userData.created_at);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);  // 월은 0부터 시작하니 1을 더해줌
        const day = ('0' + date.getDate()).slice(-2);
        return {
          ...userData,
          created_at: `${year}-${month}-${day}`
        };
      });

      res.json(formattedUsers);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

  //데이터 가져옴
  .post(async (req, res, next) => {
    try {
      
      //req.body로부토 데이터 생성
      const user = await User.create({
        comment: req.body.comment,
        name: req.body.name,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;