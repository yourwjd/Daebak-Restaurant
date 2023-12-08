const Sequelize = require('sequelize');

class Game extends Sequelize.Model {
  static initiate(sequelize) {
    Game.init({
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      msg: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Game',
      tableName: 'games',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Game.belongsTo(db.Join);
  }
};

module.exports = Game;