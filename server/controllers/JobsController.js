const JobModel = require("../models/Job");

const JobsController = {
  all: async (req, res) => {
    let allJobs;
    const search = req.query.search;
    console.log(search);
    
    if(req.query.processId && !req.query.search) {
        allJobs = await JobModel.find({ processId: req.query.processId });
        return res.json(allJobs);
    }

    if (req.query.processId && req.query.search) {
      allJobs = await JobModel.find({ processId: req.query.processId, name: { $regex: search, $options: "i" } });
      return res.json(allJobs);
    }
    allJobs = await JobModel.find();
    res.json(allJobs);
  },
};

module.exports = JobsController;
