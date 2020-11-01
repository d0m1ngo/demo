import { createReducer } from "@reduxjs/toolkit";
import {
  LOADING_PROCESSES,
  CREATE_PROCESS,
  DELETE_PROCESS,
} from "../actions/process/processActionTypes";

const processesReducer = createReducer(
  {
    data: [],
    error: null,
  },
  {
    [LOADING_PROCESSES]: (state, { payload }) => {
      return { ...state, ...payload };
    },

    [CREATE_PROCESS]: (state, { payload }) => {
      return { ...state, ...payload };
    },

    [DELETE_PROCESS]: (state, { payload }) => {
      return { ...state, ...payload };
    },
  }
);

export default processesReducer;
