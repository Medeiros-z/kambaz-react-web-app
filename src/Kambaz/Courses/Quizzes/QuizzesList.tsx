import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useState } from "react";

import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";

export default function QuizzesList({ quizzes, createQuiz, removeQuiz, togglePublish }: any) {
  //const { cid } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sort quizzes by avail date (earliest first)
  // Empty dates go LAST
  const sortedQuizzes = [...quizzes].sort((a: any, b: any) => {
    const dateA = a.availableDate ? new Date(a.availableDate).getTime() : Infinity;
    const dateB = b.availableDate ? new Date(b.availableDate).getTime() : Infinity;
    return dateA - dateB;
  });

  const filteredQuizzes = sortedQuizzes.filter((q: any) =>
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
            <div className="wd-quizComponents p-3 ps-2">
              
              {/* Title*/}
              <div className="wd-title d-flex align-items-center mb-2">
                <BsGripVertical className="me-2 fs-3" />
                <span className="fs-5">{quiz.title}</span>
              </div>
              
              {/* Details */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="wd-availableDate text-dark ms-5">
                  {quiz.dueDate ? `Available: ${new Date(quiz.availableDate).toLocaleString()}` : "No available date"}
                </div>

                <div className="wd-dueDate text-dark ms-5">
                  {quiz.dueDate ? `Due: ${new Date(quiz.dueDate).toLocaleString()}` : "No due date"}
                </div>
                
                <div className="wd-points text-danger ms-5">
                  {quiz.points} Points
                </div>

                <div className="wd-questions text-dark ms-5">
                  {quiz.questions.length} Questions
                </div>

                {/* Control Buttons */}
                <QuizControlButtons
                  quizId={quiz._id}
                  isPublished={quiz.isPublished}
                  editQuiz={() => navigate(`${quiz._id}/edit`)}
                  deleteQuiz={() => removeQuiz(quiz._id)}
                  togglePublish={() => togglePublish(quiz._id)}
                />
              </div>
            </div>

          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}