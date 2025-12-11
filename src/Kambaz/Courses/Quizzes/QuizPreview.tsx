import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

export default function QuizPreview() {
  const { qid } = useParams();
  const navigate = useNavigate();

  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!quiz) return <div>Quiz not found</div>;

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const gradeQuiz = () => {
    let total = 0;

    quiz.questions.forEach((q: any) => {
      const userAns = answers[q.id];

      if (q.type === "Multiple Choice") {
        const correctIndex = q.choices.findIndex((c: any) => c.correct);
        if (userAns === correctIndex) total += q.points;
      }

      if (q.type === "True/False" && userAns === q.answer) {
        total += q.points;
      }

      if (q.type === "Fill in the Blank") {
        const normalized = String(userAns || "").trim().toLowerCase();
        const correctList = q.answers.map((a: string) => a.toLowerCase().trim());
        if (correctList.includes(normalized)) total += q.points;
      }
    });

    setScore(total);
    setSubmitted(true);
  };

  const questionsToDisplay = quiz.oneQuestionAtATime
    ? [quiz.questions[currentIndex]]
    : quiz.questions;

  return (
    <div>
      <h2>Preview: {quiz.title}</h2>
      <p>{quiz.description}</p>

      {!submitted ? (
        <>
          {questionsToDisplay.map((q: any, idx: number) => (
            <Card key={q.id} className="mb-3 p-3">
              <h5>
                {quiz.oneQuestionAtATime
                  ? `${currentIndex + 1}. ${q.title} (${q.points} pts)`
                  : `${idx + 1}. ${q.title} (${q.points} pts)`}
              </h5>
              <div className="mb-2">{q.question}</div>

              {q.type === "Multiple Choice" && (
                <Form>
                  {q.choices.map((choice: any, i: number) => (
                    <Form.Check
                      key={i}
                      type="radio"
                      label={choice.text}
                      name={q.id}
                      checked={answers[q.id] === i}
                      onChange={() => updateAnswer(q.id, i)}
                    />
                  ))}
                </Form>
              )}

              {q.type === "True/False" && (
                <Form>
                  <Form.Check
                    type="radio"
                    label="True"
                    name={q.id}
                    checked={answers[q.id] === true}
                    onChange={() => updateAnswer(q.id, true)}
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name={q.id}
                    checked={answers[q.id] === false}
                    onChange={() => updateAnswer(q.id, false)}
                  />
                </Form>
              )}

              {q.type === "Fill in the Blank" && (
                <Form.Control
                  type="text"
                  placeholder="Enter your answer..."
                  value={answers[q.id] || ""}
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                />
              )}
            </Card>
          ))}

          {quiz.oneQuestionAtATime && (
            <div className="d-flex justify-content-between">
              <Button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                Previous
              </Button>
              {currentIndex < quiz.questions.length - 1 ? (
                <Button onClick={() => setCurrentIndex((i) => i + 1)}>Next</Button>
              ) : (
                <Button onClick={gradeQuiz}>Submit Preview</Button>
              )}
            </div>
          )}

          {!quiz.oneQuestionAtATime && (
            <Button className="mt-3" onClick={gradeQuiz}>
              Submit Preview
            </Button>
          )}
        </>
      ) : (
        <>
          <h3>Your Score: {score}</h3>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => navigate("..")}
          >
            Back
          </Button>
        </>
      )}
    </div>
  );
}
