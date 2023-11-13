const Sequelize = require('sequelize');

//reservation 모델 정의
class Reservation extends Sequelize.Model {

  //초기화
  static initiate(sequelize) {

    //값 정의
    Reservation.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(5),
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING(13),
        allowNull: true,
      },
      people_number: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },
      order_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Reservation',
      tableName: 'reservations',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};

module.exports = Reservation;