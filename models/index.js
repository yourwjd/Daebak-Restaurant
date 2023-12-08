//시퀄라이즈 연동
const Sequelize = require('sequelize');

//mysql 테이블 연동
//로그인 페이지
const Join = require('./join');
//유저 이벤트 페이지
const User = require('./user');
//좋아요 페이지
const Like = require('./like');
//예약 페이지
const Reservation = require('./reservation');
//게임 페이지
const Game = require('./game');

const fs = require('fs');
const path = require('path');

//config.json에서 development 사용
const env = process.env.NODE_ENV || 'development'; 
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

//데이터베이스 초기화, 연결
//현재 디렉퇼 속 모든 파일을 동기적으로 읽음
const basename = path.basename(__filename);
fs
  .readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
  .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // 해당 파일의 모델 불러와서 init
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });

  //각 모델의 associate 메소드 호출
Object.keys(db).forEach(modelName => { // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Join = Join;
db.User = User;
db.Like = Like;
db.Reservation = Reservation;
db.Game = Game;

module.exports = db;

