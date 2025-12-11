import { useParams, useNavigate, Routes, Route } from "react-router";
import { useEffect } from "react";

import { setQuizzes, deleteQuiz, publishQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "./client";

import QuizDetails from "./QuizDetails";
import QuizEditorPage from "./QuizEditorPage";
import TakeQuiz from "./TakeQuiz";
import QuizzesList from "./QuizzesList";
import QuizPreview from "./QuizPreview";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    if (!cid) return;
    const data = await quizzesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // Create quiz → add to store → open details page
  const createQuiz = async () => {
    if (!cid) return;

    const quiz = {
      title: `Quiz ${quizzes.length + 1}`,
      course: cid,
      type: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      attempts: 1,
      showCorrectAnswers: false,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      questions: [],
    };

    // Create via API
    const newQuiz = await quizzesClient.createQuizForCourse(cid, quiz);

    // Add to Redux store
    dispatch(setQuizzes([...quizzes, newQuiz]));

    // Navigate to details page (relative path works with hash routing)
    navigate(`${newQuiz._id}`);
  };

  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const togglePublish = async (quizId: string) => {
  try {
    const quiz = quizzes.find((q: any) => q._id === quizId);
    if (!quiz) return;

    const newState = !quiz.isPublished;

    // 1️⃣ Update backend
    await quizzesClient.toggleQuizPublish(quizId, newState);

    // 2️⃣ Update Redux store
    dispatch(publishQuiz({ quizId, isPublished: newState }));
  } catch (err) {
    console.error(err);
    alert("Failed to toggle publish state");
  }
};

  return (
    <Routes>
      <Route
        index
        element={
          <QuizzesList
            quizzes={quizzes}
            createQuiz={createQuiz}
            removeQuiz={removeQuiz}
            togglePublish={togglePublish}
          />
        }
      />
      <Route path=":qid" element={<QuizDetails />} />
      <Route path=":qid/edit" element={<QuizEditorPage />} />
      <Route path=":qid/take" element={<TakeQuiz />} />
      <Route path=":qid/preview" element={<QuizPreview />} />
      
    </Routes>
  );
}
