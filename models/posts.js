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
        as: 'Like',
        foreignKey:'postId',
        otherKey:'userId'
      })
      Posts.hasMany(models.Comments,{
        // through:'Comments',
        // as:'Comment',
        foreignKey:'postId',
        // otherKey:'userId'
      })
      Posts.belongsTo(models.Users,{
        foreignKey:'userId'
      })
    }
  };
  Posts.init({
    title: DataTypes.STRING,
    titleBlurb: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    geotagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};