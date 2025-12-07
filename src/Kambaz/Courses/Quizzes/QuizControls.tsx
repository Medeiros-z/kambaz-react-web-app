import { FormControl, Button, InputGroup } from "react-bootstrap";

export default function QuizControls({
  searchTerm,
  setSearchTerm,
  addQuiz,
}: {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  addQuiz: () => void;
}) {
  return (
    <div className="d-flex gap-2">
      <InputGroup>
        <FormControl
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Button onClick={addQuiz} variant="primary">
        Add Quiz
      </Button>
    </div>
  );
}
