import { createAction } from "@reduxjs/toolkit";
import {
  LOADING_JOBS,
  LOADING_SUCCESS_JOBS,
  LOADING_FAILED_JOBS,
  REQUEST_JOBS,
} from "./jobsActionTypes";

export const LoadJobs = createAction(LOADING_JOBS);
export const LoadJobsSuccess = createAction(LOADING_SUCCESS_JOBS);
export const LoadJobsFailed = createAction(LOADING_FAILED_JOBS);
export const requestJobs = createAction(REQUEST_JOBS);
