import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload }) => {
      state.quizzes = payload; // ALWAYS an array
    },
    addQuiz: (state, { payload }) => {
      state.quizzes.push(payload);
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
