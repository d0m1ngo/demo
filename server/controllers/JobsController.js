const JobModel = require("../models/Job");

const JobsController = {
  all: async (req, res) => {
    let allJobs;

    const { search, name, status } = req.query;
    const sortBy = { ...req.query };
    delete sortBy.search;
    if (req.params.processId) {
      allJobs = await JobModel.find({ processId: req.params.processId, name: { $regex: search, $options: "i" } }).sort({ ...sortBy });
      return res.json(allJobs);
    }
    allJobs = await JobModel.find();
    res.json(allJobs);
  },
};

module.exports = JobsController;
