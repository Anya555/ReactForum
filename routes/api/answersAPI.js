const router = require("express").Router();
const answersControllers = require("../../controllers/answersControllers");

router.route("/").post(answersControllers.create);

module.exports = router;
