import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as quizzesClient from "./client";

export default function QuizDetails() {
  const { 
    //cid, 
    qid } = useParams();
  const navigate = useNavigate();

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format dates safely
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleString();
  };

  const fetchQuiz = async () => {
    if (!qid) return;

    // Try to get from store first
    const fromStore = quizzes.find((q: any) => q._id === qid);
    if (fromStore) {
      setQuiz(fromStore);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    try {
      const data = await quizzesClient.getQuizById(qid);
      setQuiz(data);
    } catch (err: any) {
      setError("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid, quizzes]);

  // ✅ Use relative navigation to avoid breaking hash routes
  const startQuiz = () => {
    if (!qid) return;
    navigate(`take`);
  };

  const editQuiz = () => {
    if (!qid) return;
    navigate(`edit`);
  };

  const previewQuiz = () => {
    if (!qid) return;
    navigate(`preview`);
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!quiz) return <div>Quiz not found</div>;

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
