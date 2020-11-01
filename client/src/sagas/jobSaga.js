import { call, put, takeEvery } from "redux-saga/effects";
import api from "../helpers/api";
import {
  LoadJobs,
  LoadJobsSuccess,
  LoadJobsFailed,
} from "../actions/jobs/jobsActions";
import { REQUEST_JOBS } from "../actions/jobs/jobsActionTypes";

export function* fetchData(action) {
  LoadJobs();
  try {
    const response = yield call(api.getJobs, { params: action.payload.params });
    if (!response.ok) {
      yield put(LoadJobsFailed({ error: yield call([response, "json"]) }));
      return;
    }

    yield put(LoadJobsSuccess({ data: yield call([response, "json"]) }));
  } catch (error) {
    yield put(LoadJobsFailed({ error }));
  }
}

export function* watchFetchJobsData() {
  yield takeEvery(REQUEST_JOBS, fetchData);
}
