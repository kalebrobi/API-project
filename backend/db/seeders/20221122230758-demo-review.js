'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Had a great time, beautiful place',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Not the safest neighborhood',
        stars: 3
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Cant wait to come back and stay here again',
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Fantastic hosts',
        stars: 4
      },
      {
        spotId: 2,
        userId: 5,
        review: 'The worst expierence',
        stars: 2
      },
      {
        spotId: 3,
        userId: 6,
        review: 'Check in process is terrible',
        stars: 3
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
   }, {});
  }
};
