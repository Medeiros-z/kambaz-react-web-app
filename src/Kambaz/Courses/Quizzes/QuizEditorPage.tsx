import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import QuizEditor from "./QuizEditor/QuizEditor";
import { updateQuiz } from "./reducer";

export default function QuizEditorPage() {
  const { 
    //cid, 
    qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  if (!quiz) return <div>Quiz not found</div>;

  const saveQuiz = () => {
    dispatch(updateQuiz(quiz)); // update in store
    // ✅ Use relative navigation so hash router works
    navigate("..", { relative: "path" }); // goes up to the quiz list
  };

  return (
    <QuizEditor
      show={true}
      handleClose={() => navigate("..", { relative: "path" })} // same here
      dialogTitle="Edit Quiz"
      quiz={quiz}
      setQuiz={(updated: any) => dispatch(updateQuiz(updated))}
      saveQuiz={saveQuiz}
    />
  );
}
