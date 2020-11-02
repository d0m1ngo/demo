import { call, put, takeEvery } from "redux-saga/effects";
import api from "../helpers/api";
import {
  LoadProcesses,
  createProcess,
  deleteProcess,
} from "../actions/process/processActions";
import {
  REQUEST_PROCESSES,
  CREATE_REQUEST_PROCESS,
  DELETE_REQUEST_PROCESS,
} from "../actions/process/processActionTypes";

export function* fetchData(action) {
  yield put(LoadProcesses({ error: null, getStatus: "pending" }));
  try {
    const response = yield call(api.getProcesses, { ...action.payload });
    if (!response.ok) {
      yield put(
        LoadProcesses({
          error: yield call([response, "json"]),
          getStatus: "failed",
        })
      );
      return;
    }

    yield put(
      LoadProcesses({
        data: yield call([response, "json"]),
        error: null,
        getStatus: "ok",
      })
    );
  } catch (error) {
    yield put(LoadProcesses({ error, getStatus: "failed" }));
  }
}

export function* createData() {
  yield put(createProcess({ error: null, postStatus: "pending" }));
  try {
    const response = yield call(api.createProcess);
    if (!response.ok) {
      yield put(
        createProcess({
          error: yield call([response, "json"]),
          postStatus: "failed",
        })
      );
      return;
    }

    yield put(
      createProcess({
        error: null,
        postStatus: "ok",
      })
    );
  } catch (error) {
    yield put(createProcess({ error, postStatus: "failed" }));
  }
}

export function* removeData(action) {
  yield put(deleteProcess({ error: null, deleteStatus: "pending" }));
  try {
    const response = yield call(api.deleteProcess, {
      processId: action.payload.processId,
    });
    if (!response.ok) {
      yield put(
        deleteProcess({
          error: yield call([response, "json"]),
          deleteStatus: "failed",
        })
      );
      return;
    }

    yield put(deleteProcess({ deleteStatus: "ok" }));
  } catch (error) {
    yield put(deleteProcess({ error, deleteStatus: "failed" }));
  }
}

export function* watchFetchProcessesData() {
  yield takeEvery(REQUEST_PROCESSES, fetchData);
  yield takeEvery(CREATE_REQUEST_PROCESS, createData);
  yield takeEvery(DELETE_REQUEST_PROCESS, removeData);
}
