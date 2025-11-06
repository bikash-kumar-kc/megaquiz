import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalquestions: "",
  categoryCode: "",
  difficultyMode: "",
  isupdate: false,
};

const userRequirementSlice = createSlice({
  name: "userrequirement",
  initialState,
  reducers: {
    userRequirement: (state, action) => {
      state.totalquestions = action.payload.totalquestions;
      state.categoryCode = action.payload.categoryCode;
      state.difficultyMode = action.payload.difficultyMode;
      state.isupdate = true;
    },
    resetStore: (state) => {
      state.totalquestions = "";
      state.categoryCode = "";
      state.difficultyMode = "";
      state.isupdate = false;
    },
  },
});

export const { userRequirement, resetStore } = userRequirementSlice.actions;
export default userRequirementSlice.reducer;
