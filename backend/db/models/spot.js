'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    // static async createNewSpot({})
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.Review, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      Spot.hasMany(
        models.SpotImage, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      Spot.belongsTo(
        models.User, {
          foreignKey: 'ownerId'
        }
      );
      Spot.hasMany(
        models.Booking, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      );
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      getReviewsOfUser: {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description']
        },
      }
    }
  });
  return Spot;
};
