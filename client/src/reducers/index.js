import { combineReducers } from "@reduxjs/toolkit";

import jobs from "./jobReducer";
import processes from "./processReducer";

export default combineReducers({
  jobs,
  processes,
});
