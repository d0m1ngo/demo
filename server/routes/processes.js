const router = require('express').Router();

router.get("/", function (req, res) {
  res.send("GET request to the processes");
});

// POST method route
router.post("/", function (req, res) {
  res.send("POST request to the processes");
});


module.exports = router;