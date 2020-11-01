import request from "./request";

export default {
  getJobs: (args) =>
    request.get({
      url: `/api/jobs/`,
      ...args,
    }),
  getProcesses: (args) =>
    request.get({
      url: `/api/processes/`,
      ...args,
    }),
  createProcess: (args) =>
    request.post({
      url: `/api/processes/`,
      ...args,
    }),
  deleteProcess: ({ processId }) =>
    request.delete({
      url: `/api/processes/${processId}`,
    }),
};
