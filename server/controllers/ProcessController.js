const ProcessModel = require("../models/Process");
const JobModel = require("../models/Job");
const Chance = require("chance");
const chance = new Chance();

const statuses = ["running", "successed", "failed"];

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomStatus = () => {
  return statuses[randomInteger(0, 3)];
};

const createJob = async (processId) => {
  const newJob = new JobModel({ name: chance.profession(), status: getRandomStatus(), processId });
  const savedJob = await newJob.save();
  const countJobs = await JobModel.countDocuments({ processId });
  console.log(countJobs);
  return await ProcessModel.findByIdAndUpdate(processId, { $push: { jobs: savedJob._id }, jobsCount: countJobs }, { new: true, useFindAndModify: false });
};

const getProcessStatus = (process) => {
  const jobs = process.jobs;
  const successStatus = jobs.every((job) => job.status === "successed") && "success";
  const failedStatus = jobs.every((job) => job.status === "failed") && "failed";
  const runningStatus = jobs.some((job) => job.status === "running") && "runnning";
  return successStatus || failedStatus || runningStatus;
};

const ProcessController = {
  all: async (req, res) => {
    const allProcesses = await ProcessModel.find().populate("jobs").lean().exec();

    const processesWithStatus = allProcesses.map((process) => ({ ...process, status: getProcessStatus(process), jobs: null }));
    res.json(processesWithStatus);
  },
  create: async (req, res) => {
    const newProcess = ProcessModel({ name: chance.profession(), startTime: chance.date() });
    const savedProcess = await newProcess.save();
    for (let i = 0; i < randomInteger(1, 10); i++) {
      await createJob(savedProcess._id);
    }
    res.json(savedProcess);
  },
  delete: async (req, res) => {
    const processId = req.params.processId;
    await ProcessModel.deleteOne({ _id: processId });
    await JobModel.deleteMany({ processId });
    res.json({});
  },
};

module.exports = ProcessController;
