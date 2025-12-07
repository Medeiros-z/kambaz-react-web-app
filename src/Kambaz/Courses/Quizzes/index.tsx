import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons.tsx";

import { setQuizzes, deleteQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch quizzes for course
  const fetchQuizzes = async () => {
    if (!cid) return;
    const data = await quizzesClient.findQuizzesForCourse(cid);
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // Create quiz → open quiz details page
  const createQuiz = async () => {
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

    const newQuiz = await quizzesClient.createQuizForCourse(cid!, quiz);

    // Navigate to details screen for new quiz
    navigate(`/courses/${cid}/quizzes/${newQuiz._id}`);
  };

  // Delete quiz
  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  // Filter quizzes by search term
  const filteredQuizzes = quizzes.filter((q: any) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wd-quizzes p-3">
      {/* TOP CONTROLS */}
      <QuizControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        addQuiz={createQuiz}
      />

      <br /><br />

      {/* QUIZZES LIST */}
      <ListGroup className="rounded-0">
        {filteredQuizzes.map((quiz: any) => (
          <ListGroup.Item
            key={quiz._id}
            className="wd-quiz p-0 mb-3 fs-5 border-gray"
            onClick={() => navigate(`/courses/${cid}/quizzes/${quiz._id}`)}
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
                editQuiz={() => navigate(`/courses/${cid}/quizzes/${quiz._id}/edit`)}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
