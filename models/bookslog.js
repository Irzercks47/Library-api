'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookslog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookslog.init({
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookslog',
  });
  return Bookslog;
};