module.exports = function (sequelize, DataTypes) {
  const Questions = sequelize.define("Questions", {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    code: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
  });
  return Questions;
};
