const router = require("express").Router();
const answersControllers = require("../../controllers/answersControllers");

router.route("/").post(answersControllers.create);
router.route("/").get(answersControllers.findAll);

module.exports = router;
