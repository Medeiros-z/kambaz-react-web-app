import { Modal, Button, Form, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";

import QuestionsEditor from "./QuestionsEditor";

export default function QuizEditor({
  show,
  handleClose,
  dialogTitle,
  quiz,
  setQuiz,
  saveQuiz,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  quiz: any;
  setQuiz: (q: any) => void;
  saveQuiz: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");

  if (!quiz) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k as any)} className="mb-3">
          <Tab eventKey="details" title="Details">
            <Form>
              {/* ---------- TITLE ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Quiz Title</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.title}
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                />
              </Form.Group>

              {/* ---------- QUIZ TYPE ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={quiz.type}
                  onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
                >
                  <option>Graded Quiz</option>
                  <option>Practice Quiz</option>
                  <option>Graded Survey</option>
                  <option>Ungraded Survey</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- POINTS ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Total Points</Form.Label>
                <Form.Control
                  type="number"
                  value={quiz.points}
                  onChange={(e) => setQuiz({ ...quiz, points: Number(e.target.value) })}
                />
              </Form.Group>

              {/* ---------- ASSIGNMENT GROUP ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                >
                  <option>Quizzes</option>
                  <option>Exams</option>
                  <option>Assignments</option>
                  <option>Project</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- SHUFFLE ANSWERS ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Shuffle Answers</Form.Label>
                <Form.Select
                  value={quiz.shuffleAnswers ? "Yes" : "No"}
                  onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.value === "Yes" })}
                >
                  <option>Yes</option>
                  <option>No</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- TIME LIMIT ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Time Limit (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })}
                />
              </Form.Group>

              {/* ---------- MULTIPLE ATTEMPTS ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Multiple Attempts</Form.Label>
                <Form.Select
                  value={quiz.multipleAttempts ? "Yes" : "No"}
                  onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.value === "Yes" })}
                >
                  <option>No</option>
                  <option>Yes</option>
                </Form.Select>
              </Form.Group>

              {quiz.multipleAttempts && (
                <Form.Group className="mb-3">
                  <Form.Label>How Many Attempts</Form.Label>
                  <Form.Control
                    type="number"
                    value={quiz.attempts}
                    onChange={(e) => setQuiz({ ...quiz, attempts: Number(e.target.value) })}
                  />
                </Form.Group>
              )}

              {/* ---------- SHOW CORRECT ANSWERS ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Select
                  value={quiz.showCorrectAnswers ? "Yes" : "No"}
                  onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value === "Yes" })}
                >
                  <option>No</option>
                  <option>Yes</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- ACCESS CODE ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Access Code</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.accessCode}
                  onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                />
              </Form.Group>

              {/* ---------- ONE QUESTION AT A TIME ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>One Question at a Time</Form.Label>
                <Form.Select
                  value={quiz.oneQuestionAtATime ? "Yes" : "No"}
                  onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.value === "Yes" })}
                >
                  <option>Yes</option>
                  <option>No</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- WEBCAM REQUIRED ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Webcam Required</Form.Label>
                <Form.Select
                  value={quiz.webcamRequired ? "Yes" : "No"}
                  onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.value === "Yes" })}
                >
                  <option>No</option>
                  <option>Yes</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- LOCK QUESTIONS ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Lock Questions After Answering</Form.Label>
                <Form.Select
                  value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                  onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.value === "Yes" })}
                >
                  <option>No</option>
                  <option>Yes</option>
                </Form.Select>
              </Form.Group>

              {/* ---------- DATE FIELDS ---------- */}
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.dueDate}
                  onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.availableDate}
                  onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.untilDate}
                  onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Tab>

          <Tab eventKey="questions" title="Questions">
            <QuestionsEditor quiz={quiz} setQuiz={setQuiz} />
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={saveQuiz}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
