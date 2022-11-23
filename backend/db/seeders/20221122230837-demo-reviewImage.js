'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'pictureofreview1.io'
    },
    {
      reviewId: 2,
      url: 'pictureofreview2.io'
    },
    {
      reviewId: 3,
      url: 'pictureofreview3.io'
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['pictureofreview1.io','pictureofreview2.io','pictureofreview3.io'] }
    }, {});
  }
};
