module.exports = function (sequelize, DataTypes) {
  const Questions = sequelize.define("Questions", {
    title: DataTypes.STRING(3000),
    body: DataTypes.STRING(3000),
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
  });
  return Questions;
};
