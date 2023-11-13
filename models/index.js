//시퀄라이즈 연동
const Sequelize = require('sequelize');

//mysql 테이블 연동
//유저 이벤트 페이지
const User = require('./user');
//좋아요 페이지
const Like = require('./like');
//예약 페이지
const Reservation = require('./reservation');

//config.json에서 development 사용
const env = process.env.NODE_ENV || 'development'; 
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Like = Like;
db.Reservation = Reservation;

//초기화
User.initiate(sequelize);
Like.initiate(sequelize);
Reservation.initiate(sequelize);

module.exports = db;

