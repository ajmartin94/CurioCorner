'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Posts, {
        foreignKey: "postId"
      })
      Comments.belongsTo(models.Users, {
        foreignKey: "userId"
      })
      Comments.belongsToMany(models.Users,{
        through:'CommentLikes',
        foreignKey:'commentId',
        otherKey:'userId'
      })
    }
  };
  Comments.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};