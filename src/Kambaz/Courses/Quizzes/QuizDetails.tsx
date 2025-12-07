import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";

type QuizDetailsProps = {
  quizId?: string; // optional if navigating directly
};

export default function QuizDetails({ quizId }: QuizDetailsProps) {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>({
    title: "",
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
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quizIdToLoad = quizId || qid;

  // Format dates safely
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString; // fallback
    return d.toLocaleString();
  };

  const fetchQuiz = async () => {
    if (!quizIdToLoad) return;
    try {
      const data = await quizzesClient.getQuizById(quizIdToLoad);
      setQuiz(data);
    } catch (err: any) {
      setError("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizIdToLoad]);

  const startQuiz = () => {
    if (!quizIdToLoad) return;
    navigate(`/courses/${cid}/quizzes/${quizIdToLoad}/take`);
  };

  const editQuiz = () => {
    if (!quizIdToLoad) return;
    navigate(`/courses/${cid}/quizzes/${quizIdToLoad}/edit`);
  };

  const previewQuiz = () => {
    if (!quizIdToLoad) return;
    navigate(`/courses/${cid}/quizzes/${quizIdToLoad}/preview`);
  };

  // Loading UI
  if (loading) return <div>Loading quiz...</div>;

  // Error UI
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="wd-quiz-details">
      <h2>{quiz.title}</h2>

      <table className="table">
        <tbody>
          <tr><td>Quiz Type</td><td>{quiz.type}</td></tr>
          <tr><td>Points</td><td>{quiz.points}</td></tr>
          <tr><td>Assignment Group</td><td>{quiz.assignmentGroup}</td></tr>
          <tr><td>Shuffle Answers</td><td>{quiz.shuffleAnswers ? "Yes" : "No"}</td></tr>
          <tr><td>Time Limit</td><td>{quiz.timeLimit} Minutes</td></tr>
          <tr><td>Multiple Attempts</td><td>{quiz.multipleAttempts ? "Yes" : "No"}</td></tr>
          <tr><td>How Many Attempts</td><td>{quiz.attempts}</td></tr>
          <tr><td>Show Correct Answers</td><td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td></tr>
          <tr><td>Access Code</td><td>{quiz.accessCode || "-"}</td></tr>
          <tr><td>One Question at a Time</td><td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td></tr>
          <tr><td>Webcam Required</td><td>{quiz.webcamRequired ? "Yes" : "No"}</td></tr>
          <tr><td>Lock Questions After Answering</td><td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td></tr>

          <tr><td>Available Date</td><td>{formatDate(quiz.availableDate)}</td></tr>
          <tr><td>Due Date</td><td>{formatDate(quiz.dueDate)}</td></tr>
          <tr><td>Until Date</td><td>{formatDate(quiz.untilDate)}</td></tr>
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" onClick={startQuiz}>Start Quiz</button>
        <button className="btn btn-secondary" onClick={previewQuiz}>Preview</button>
        <button className="btn btn-outline-secondary" onClick={editQuiz}>Edit</button>
      </div>
    </div>
  );
}
