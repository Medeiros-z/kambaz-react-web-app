import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    quizzesReducer,
  },
});

// Export RootState and AppDispatch based on current reducer keys
export type RootState = {
  modulesReducer: ReturnType<typeof modulesReducer>;
  accountReducer: ReturnType<typeof accountReducer>;
  assignmentsReducer: ReturnType<typeof assignmentsReducer>;
  coursesReducer: ReturnType<typeof coursesReducer>;
  quizzesReducer: ReturnType<typeof quizzesReducer>;
};

export type AppDispatch = typeof store.dispatch;

export default store;
