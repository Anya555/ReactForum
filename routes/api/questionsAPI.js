const router = require("express").Router();
const questionsController = require("../../controllers/questionsController");

router.route("/").post(questionsController.create);
module.exports = router;
