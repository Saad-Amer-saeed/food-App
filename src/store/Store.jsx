import { configureStore } from "@reduxjs/toolkit";
import handelSlice from "../Slice/HandelSlice";
import HandelProgress from "../Slice/HandelProgress";
const store = configureStore({
  reducer: {
    HandelApp: handelSlice,
    HandelProgress: HandelProgress,
  },
});

export default store;
