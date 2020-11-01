import { createAction } from "@reduxjs/toolkit";
import {
  LOADING_PROCESSES,
  REQUEST_PROCESSES,
  CREATE_PROCESS,
  CREATE_REQUEST_PROCESS,
  DELETE_PROCESS,
  DELETE_REQUEST_PROCESS,
} from "./processActionTypes";

export const LoadProcesses = createAction(LOADING_PROCESSES);
export const requestProcesses = createAction(REQUEST_PROCESSES);
export const createProcess = createAction(CREATE_PROCESS);
export const createRequestProcess = createAction(CREATE_REQUEST_PROCESS);
export const deleteProcess = createAction(DELETE_PROCESS);
export const deleteRequestProcess = createAction(DELETE_REQUEST_PROCESS);
