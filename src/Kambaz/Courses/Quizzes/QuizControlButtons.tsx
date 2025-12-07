import { Button } from "react-bootstrap";

export default function QuizControlButtons({
  quizId,
  deleteQuiz,
  editQuiz,
}: {
  quizId: string;
  deleteQuiz: () => void;
  editQuiz: () => void;
}) {
  return (
    <div className="d-flex gap-2">
      <Button size="sm" variant="outline-secondary" onClick={(e) => { e.stopPropagation(); editQuiz(); }}>
        Edit
      </Button>
      <Button size="sm" variant="outline-danger" onClick={(e) => { e.stopPropagation(); deleteQuiz(); }}>
        Delete
      </Button>
    </div>
  );
}
