module.exports = function (sequelize, DataTypes) {
  const Questions = sequelize.define("Questions", {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    code: DataTypes.STRING,
  });
  return Questions;
};
