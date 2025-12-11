import { Button } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";

export default function QuizControlButtons({
  //quizId,
  isPublished,
  editQuiz,
  deleteQuiz,
  togglePublish,
}: {
  quizId: string;
  isPublished: boolean;
  editQuiz: () => void;
  deleteQuiz: () => void;
  togglePublish: () => void;
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      {/* Green checkmark if published */}
      {isPublished && <BsCheckCircle className="text-success" size={20} />}

      {/* Publish / Unpublish */}
      <Button
        size="sm"
        variant={isPublished ? "outline-warning" : "outline-success"}
        onClick={(e) => {
          e.stopPropagation(); // prevent row click
          togglePublish();
        }}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      {/* Edit */}
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={(e) => {
          e.stopPropagation();
          editQuiz();
        }}
      >
        Edit
      </Button>

      {/* Delete */}
      <Button
        size="sm"
        variant="outline-danger"
        onClick={(e) => {
          e.stopPropagation();
          deleteQuiz();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
