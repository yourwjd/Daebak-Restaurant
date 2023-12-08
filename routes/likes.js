const express = require('express');

const router = express.Router();
const { Like } = require('../models');


// 좋아요 데이터 생성 혹은 업데이트
router.post('/likes', async (req, res, next) => {
  try {
    const { id, liked } = req.body; // id와 liked 값을 받음

    // 동일한 id를 가진 데이터가 있는지 확인하지 않고, 새로운 데이터 생성
    const like = await Like.create({ id: id, liked: liked });
    res.json(like);

  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 전체 좋아요 수 가져오기
router.get('/count', async (req, res, next) => {
  try {

    // 전체 좋아요 수 검색
    const count = await Like.count();
    res.json({ count });

  } catch (err) {
    console.error(err);

    // json 형식으로 응답
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 특정 id의 좋아요 수 가져오기
router.get('/count/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    // 특정 id의 좋아요 수 검색
    const count = await Like.count({ where: { id: id, liked: true } });

    res.json({ count });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
