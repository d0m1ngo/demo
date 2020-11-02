const router = require("express").Router();
const JobsController = require("../controllers/JobsController");

router.get("/", JobsController.all);

module.exports = router;
