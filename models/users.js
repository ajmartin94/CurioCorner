'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsToMany(models.Posts,{
        through:'Likes',
        as: 'Likes',
        foreignKey:'userId',
        otherKey:'postId'
      })
      Users.belongsToMany(models.Posts,{
        through:'Comments',
        as: 'Comments',
        foreignKey:'userId',
        otherKey:'postId'
      })
      Users.hasMany(models.Posts,{
        foreignKey:'userId'
      })
    }
  };
  Users.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    profileImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};