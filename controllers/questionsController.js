const db = require("../models");

module.exports = {
  // Post question to db
  create: function (req, res) {
    db.Questions.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // Get all questions from db
  findAll: function (req, res) {
    db.Questions.findAll(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  updateLikesCount: function (req, res) {
    db.Questions.update({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
