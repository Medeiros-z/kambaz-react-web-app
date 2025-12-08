import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useNavigate, Routes, Route } from "react-router";
import { useEffect, useState } from "react";

import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";

import { setQuizzes, deleteQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "./client";

import QuizDetails from "./QuizDetails";
import QuizEditorPage from "./QuizEditorPage";
import TakeQuiz from "./TakeQuiz";

function QuizzesList({ quizzes, createQuiz, removeQuiz }: any) {
  //const { cid } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuizzes = quizzes.filter((q: any) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wd-quizzes p-3">
      <QuizControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        addQuiz={createQuiz}
      />
      <br /><br />
      <ListGroup className="rounded-0">
        {filteredQuizzes.map((quiz: any) => (
          <ListGroup.Item
            key={quiz._id}
            className="wd-quiz p-0 mb-3 fs-5 border-gray"
            onClick={() => navigate(`${quiz._id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {quiz.title}
              </div>
              <QuizControlButtons
                quizId={quiz._id}
                deleteQuiz={() => removeQuiz(quiz._id)}
                editQuiz={() => navigate(`${quiz._id}/edit`)}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

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

  // 1️⃣ Create via API
  const newQuiz = await quizzesClient.createQuizForCourse(cid, quiz);

  // 2️⃣ Add to Redux store
  dispatch(setQuizzes([...quizzes, newQuiz]));

  // 3️⃣ Navigate to details page (relative path works with hash routing)
  navigate(`${newQuiz._id}`);
};

  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
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
          />
        }
      />
      <Route path=":qid" element={<QuizDetails />} />
      <Route path=":qid/edit" element={<QuizEditorPage />} />
      <Route path=":qid/take" element={<TakeQuiz />} />
      
    </Routes>
  );
}
