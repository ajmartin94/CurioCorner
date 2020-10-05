'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Woodwork"
      },
      {
        name: "Art"
      },
      {
        name: "Crafts"
      },
      {
        name: "Sewing"
      }
      ,{
        name: "Metal Work"
      }
      ,{
        name: "Electronics"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
