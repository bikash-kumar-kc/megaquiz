import { configureStore } from "@reduxjs/toolkit";
import questionReducers from "./questionSlice";
import userRequirementReducers from "./questionRecord";
import userResponseReducers from "./userResponseSlice";
import userRecordReducers from "./userAttemptSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    question: questionReducers,
    userrequirement: userRequirementReducers,
    userresponse: userResponseReducers,
    userrecord: userRecordReducers,
    userAuth: authReducer,
  },
});

export default store;
