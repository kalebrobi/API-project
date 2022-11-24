'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'demo1@user.io',
        username: 'Demo-user1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Jon',
        lastName: 'Jones',
        email: 'demo2@user.io',
        username: 'Demo-user2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Robert',
        lastName: 'Nix',
        email: 'demo3@user.io',
        username: 'Demo-user3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Joey',
        lastName: 'Hat',
        email: 'demo4@user.io',
        username: 'Demo-user4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Carl',
        lastName: 'Kirk',
        email: 'demo5@user.io',
        username: 'Demo-user5',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Joey',
        lastName: 'Ford',
        email: 'demo6@user.io',
        username: 'Demo-user6',
        hashedPassword: bcrypt.hashSync('password6')
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-user1', 'Demo-user2', 'Demo-user3','Demo-user4','Demo-user5','Demo-user6'] }
    }, {});
  }
};
