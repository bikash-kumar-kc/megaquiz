import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userResponse: [],
  correctResponse: [],
  questionNumber: [],
};

const userResponseSlice = createSlice({
  name: "userresponse",
  initialState,
  reducers: {
    userresponse: (state, action) => {
      state.userResponse = [...state.userResponse, action.payload];
    },
    correctresponse: (state, action) => {
      state.correctResponse = [...state.correctResponse, action.payload];
    },
    questionnumber: (state, action) => {
      state.questionNumber = [...state.questionNumber, action.payload];
    },
  },
});

export const { userresponse, correctresponse, questionnumber } =
  userResponseSlice.actions;

export default userResponseSlice.reducer;
