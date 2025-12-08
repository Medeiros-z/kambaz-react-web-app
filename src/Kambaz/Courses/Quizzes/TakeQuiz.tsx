import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

export default function TakeQuiz() {
  const { 
    //cid, 
    qid } = useParams();
  const navigate = useNavigate();

  // Find the quiz from Redux store
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz) return <div>Quiz not found</div>;

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const gradeQuiz = () => {
    let total = 0;

    quiz.questions.forEach((q: any) => {
      const userAns = answers[q.id];

      // Multiple Choice
      if (q.type === "Multiple Choice" && userAns === q.choices.findIndex((c: any) => c.correct)) {
        total += q.points;
      }

      // True / False
      if (q.type === "True/False" && userAns === q.correctAnswer) {
        total += q.points;
      }

      // Fill in the Blank
      if (q.type === "Fill in the Blank") {
        const normalized = String(userAns || "").trim().toLowerCase();
        const correctList = q.answers.map((a: string) => a.toLowerCase().trim());
        if (correctList.includes(normalized)) total += q.points;
      }
    });

    setScore(total);
    setSubmitted(true);
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      {!submitted ? (
        <>
          {quiz.questions.map((q: any, index: number) => (
            <Card key={q.id} className="mb-3 p-3">
              <h5>
                {index + 1}. {q.title} ({q.points} pts)
              </h5>
              <div className="mb-2">{q.question}</div>

              {/* MULTIPLE CHOICE */}
              {q.type === "Multiple Choice" && (
                <Form>
                  {q.choices.map((choice: any, idx: number) => (
                    <Form.Check
                      key={idx}
                      type="radio"
                      label={choice.text} // ✅ make sure to render the text, not the object
                      name={q.id}
                      checked={answers[q.id] === idx}
                      onChange={() => updateAnswer(q.id, idx)}
                    />
                  ))}
                </Form>
              )}

              {/* TRUE/FALSE */}
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

              {/* FILL IN THE BLANK */}
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

          <Button className="mt-3" onClick={gradeQuiz}>
            Submit Quiz
          </Button>
        </>
      ) : (
        <>
          <h3>Your Score: {score}</h3>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => navigate(`../`)} // ✅ relative navigation back to quiz details
          >
            Back to Quiz Details
          </Button>
        </>
      )}
    </div>
  );
}
