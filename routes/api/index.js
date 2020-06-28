const router = require("express").Router();
const questionsRouts = require("./questionsAPI");

router.use("/questions", questionsRouts);

module.exports = router;
