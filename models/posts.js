'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsToMany(models.Category,{
        through:'PostsCategory',
        foreignKey:'postId',
        otherKey:'categoryId'
      })
      Posts.belongsToMany(models.Users,{
        through:'Likes',
        foreignKey:'postId',
        otherKey:'userId'
      })
      Posts.belongsToMany(models.Users,{
        through:'Comments',
        foreignKey:'postId',
        otherKey:'userId'
      })
      Posts.belongsTo(models.Users,{
        foreignKey:'userId'
      })
    }
  };
  Posts.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    geotagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};