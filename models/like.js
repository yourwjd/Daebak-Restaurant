const Sequelize = require('sequelize');

//like 모델 정의
class Like extends Sequelize.Model {

  //초기화
  static initiate(sequelize) {

    //값 정의
    Like.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      liked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Like',
      tableName: 'likes',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};

module.exports = Like;