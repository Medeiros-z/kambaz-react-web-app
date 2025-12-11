import { createSlice } from "@reduxjs/toolkit";

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
    publishQuiz: (state, { payload }: { payload: { quizId: string; isPublished: boolean } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === payload.quizId ? { ...q, isPublished: payload.isPublished } : q
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, publishQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
