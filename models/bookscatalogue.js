'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booksCatalogue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booksCatalogue.init({
    bookName: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    bookCover: DataTypes.STRING,
    datePublished: DataTypes.DATE,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booksCatalogue',
  });
  return booksCatalogue;
};