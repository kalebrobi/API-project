'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 2,
      startDate: '2022-12-10', //year month date
      endDate: '2022-12-15'
    },
    {
      spotId: 2,
      userId: 3,
      startDate: '2022-12-20', //year month date
      endDate: '2022-12-23'
    },
    {
      spotId: 3,
      userId: 1,
      startDate: '2022-12-26', //year month date
      endDate: '2022-12-29'
    }

   ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
   }, {});
  }
};
