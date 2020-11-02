const router = require("express").Router();
const ProcessController = require("../controllers/ProcessController");
const JobsController = require("../controllers/JobsController");

router.get("/", ProcessController.all);

router.delete("/:processId", ProcessController.delete);

router.get("/:processId/jobs", JobsController.all);

router.post("/", ProcessController.create);

module.exports = router;
