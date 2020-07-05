const router = require("express").Router();
const questionsRouts = require("./questionsAPI");
const answersRoutes = require("./answersAPI");

router.use("/questions", questionsRouts);
router.use("/answers", answersRoutes);

module.exports = router;
