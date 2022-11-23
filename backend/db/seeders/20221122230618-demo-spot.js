'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '123 Yuma Street',
      city: 'Richmond',
      state: 'Virginia',
      country: 'United States',
      lat: 12474,
      lng: 48392,
      name: 'Historic Home',
      description: 'Home in the woods',
      price: 150

    },
    {
      ownerId: 2,
      address: '772 Riverside Road',
      city: 'Scranton',
      state: 'Pennsylvania',
      country: 'United States',
      lat: 1247434,
      lng: 4832292,
      name: 'The Office',
      description: 'Hideway home near the beach',
      price: 80
    },
    {
      ownerId: 3,
      address: '403 Winter Way',
      city: 'Scranton',
      state: 'Pennsylvania',
      country: 'United States',
      lat: 1247444,
      lng: 4832294,
      name: 'Winter Bungalo',
      description: 'Cozy cabin in the forest',
      price: 300
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Historic Home', 'The Office','Winter Bungalo'] }
   }, {});
  }
};
