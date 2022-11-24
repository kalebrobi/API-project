'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'spotImage1.io',
        preview: true
      },
      {
        spotId: 2,
        url: 'spotImage2.io',
        preview: true
      },
      {
        spotId: 3,
        url: 'spotImage3.io',
        preview: false 
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['spotImage1.io','spotImage2.io','spotImage3.io'] }
    }, {})
  }
};
