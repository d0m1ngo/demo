const router = require("express").Router();
const JobsController = require("../controllers/JobsController");

router.get("/", JobsController.all);

// POST method route
router.post("/", function (req, res) {
  res.send("POST request to the jobs");
});

module.exports = router;
