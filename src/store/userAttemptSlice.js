import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRecord: false,
  userData: null,
};

const userRecordSlice = createSlice({
  name: "userrecord",
  initialState,
  reducers: {
    updateUserRecord: (state, action) => {
      state.userData = action.payload;
      state.isRecord = true;
    },
    clearRecord: (state) => {
      state.userData = null;
      state.isRecord = false;
    },
  },
});

export const { updateUserRecord, clearRecord } = userRecordSlice.actions;
export default userRecordSlice.reducer;
