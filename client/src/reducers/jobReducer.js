import { createReducer } from "@reduxjs/toolkit";
import {
  LOADING_JOBS,
  LOADING_SUCCESS_JOBS,
  LOADING_FAILED_JOBS,
} from "../actions/jobs/jobsActionTypes";

const jobReducer = createReducer(
  { jobs: [], LoadStatus: null, error: null, createStatus: null },
  {
    [LOADING_JOBS]: (state) => {
      return { ...state, LoadStatus: "pending" };
    },
    [LOADING_SUCCESS_JOBS]: (state, { payload }) => {
      return { ...state, jobs: payload.data, LoadStatus: "ok" };
    },
    [LOADING_FAILED_JOBS]: (state, { payload }) => {
      return { ...state, error: payload.error, LoadStatus: "failed" };
    },
  }
);

export default jobReducer;
