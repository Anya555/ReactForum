const router = require("express").Router();
const questionsController = require("../../controllers/questionsController");

router.route("/").post(questionsController.create);
router.route("/").get(questionsController.findAll);
router.route("/:id").put(questionsController.updateQuestionData);
router.route("/:id").get(questionsController.findQuestionId);
module.exports = router;
