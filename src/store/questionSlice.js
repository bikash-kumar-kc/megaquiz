import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchQuestions from "../api/fetchQuestion";

const initialState = {
  question: [],
  status: "idle",
  error: null,
};

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async ({ totalquestions, categoryCode, difficultyMode }) => {
    console.log("we are at store...");
    const questions = await fetchQuestions({
      totalquestions,
      categoryCode,
      difficultyMode,
    });
    return questions;
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    clearQuestion: (state) => {
      state.question = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.status = "success";
        state.question = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        (state.status = "false"), (state.error = action.error.message);
      });
  },
});

export const { clearQuestion } = questionSlice.actions;
export default questionSlice.reducer;
