const Sequelize = require('sequelize');

//user 모델 정의
class User extends Sequelize.Model {

  //초기화
  static initiate(sequelize) {

    //값 정의
    User.init({
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(5),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  // static associate(db) {
  //   db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  // }
};


module.exports = User;