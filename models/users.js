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
        as: 'Like',
        foreignKey:'userId',
        otherKey:'postId'
      })
      Users.hasMany(models.Comments,{
        // through:'Comments',
        // as: 'Comment',
        foreignKey:'userId',
        // otherKey:'postId'
      })
      Users.hasMany(models.Posts,{
        foreignKey:'userId'
      })
      Users.belongsToMany(models.Users, {
        as: 'follower',
        through: 'Followers',
        foreignKey: 'baseUserId',
        otherKey: 'followerId'
      })
      Users.belongsToMany(models.Comments,{
        through:'CommentLikes',
        as: 'CommentLike',
        foreignKey:'userId',
        otherKey:'commentId'
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