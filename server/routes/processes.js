const router = require("express").Router();
const ProcessController = require("../controllers/ProcessController");

router.get("/", ProcessController.all);

router.delete("/:processId", ProcessController.delete);

router.post("/", ProcessController.create);

module.exports = router;
