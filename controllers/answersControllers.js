const db = require("../models");

module.exports = {
  // Post answer to question
  create: function (req, res) {
    // db.Answers.create(req.body)
    //   .then((dbModel) => res.json(dbModel))
    //   .catch((err) => res.status(422).json(err));
  },

  // Get all questions from db
  findAll: function (req, res) {
    // db.Answers.findAll(req.query)
    //   .then((dbModel) => res.json(dbModel))
    //   .catch((err) => res.status(422).json(err));
  },

  updateLikesCount: function (req, res) {
    // db.Answers.update(req.body, { where: { id: req.params.id } })
    //   .then((dbModel) => res.json(dbModel))
    //   .catch((err) => res.status(422).json(err));
  },
};
