const Sequelize = require('sequelize');

//like 모델 정의
class Like extends Sequelize.Model {

  //초기화
  static initiate(sequelize) {

    //값 정의
    Like.init({
      likeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      liked: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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