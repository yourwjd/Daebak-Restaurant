const express = require('express');
const Reservation = require('../models/reservation');

const router = express.Router();

//경로 라우팅
router.route('/')

//데이터 가져옴
  .get(async (req, res, next) => {
    try {

      //데이터 검색
      const reservations = await Reservation.findAll();

      //json 형식으로 응답
      res.json(reservations);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

  //데이터 가져옴
  .post(async (req, res, next) => {
    try {
      
      //req.body로부토 데이터 생성
      const reservation = await Reservation.create({
        name: req.body.name,
        phone_number: req.body.phone_number,
        people_number: req.body.people_number,
        order_date: req.body.order_date,
        comment: req.body.comment,
      });
      console.log(reservation);

      //json 형식으로 응답
      res.status(201).json(reservation);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;