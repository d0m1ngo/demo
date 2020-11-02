import request from "./request";

export default {
  getJobs: ({ processId, params }) =>
    request.get({
      url: `/api/processes/${processId}/jobs`,
      params,
    }),
  getProcesses: (args) =>
    request.get({
      url: `/api/processes/`,
      ...args,
    }),
  createProcess: () =>
    request.post({
      url: `/api/processes/`,
    }),
  deleteProcess: ({ processId, params }) =>
    request.delete({
      url: `/api/processes/${processId}`,
      params,
    }),
};
