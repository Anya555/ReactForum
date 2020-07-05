module.exports = function (sequelize, DataTypes) {
  const Answers = sequelize.define("Answers", {
    questionId: DataTypes.INTEGER,
    body: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
  });
  return Answers;
};
