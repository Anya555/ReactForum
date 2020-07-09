const router = require("express").Router();
const answersControllers = require("../../controllers/answersControllers");

router.route("/").post(answersControllers.create);
router.route("/").get(answersControllers.findAll);
router.route("/:id").put(answersControllers.updateLikesCount);

module.exports = router;
