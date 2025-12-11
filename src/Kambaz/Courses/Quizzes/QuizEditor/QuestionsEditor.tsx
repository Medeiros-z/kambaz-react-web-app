import { useState } from "react";
import { Button, Card } from "react-bootstrap";

import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillBlankEditor";

export default function QuestionsEditor({
  quiz,
  setQuiz,
}: {
  quiz: any;
  setQuiz: (q: any) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newType, setNewType] = useState("Multiple Choice");

  const addQuestion = () => {
    const base = {
      id: `q_${Date.now()}`,
      type: newType,
      title: "",
      question: "",
      points: 1,
    };

    let newQuestion: any;

    switch (newType) {
      case "Multiple Choice":
        newQuestion = {
          ...base,
          choices: ["", ""],
          correctChoice: 0,
        };
        break;

      case "True/False":
        newQuestion = {
          ...base,
          correctAnswer: true,
        };
        break;

      case "Fill in the Blank":
        newQuestion = {
          ...base,
          answers: [""],
        };
        break;

      default:
        newQuestion = base;
    }

    const updated = [...(quiz.questions || []), newQuestion];
    setQuiz({ ...quiz, questions: updated });
    setEditingIndex(updated.length - 1);
  };

  const saveQuestion = (updatedQuestion: any, index: number) => {
    const updatedQuestions = quiz.questions.map((q: any, i: number) =>
      i === index ? updatedQuestion : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
    setEditingIndex(null);
  };

  const cancelEdit = (index: number) => {
    // If a newly added question was never touched, remove it
    const q = quiz.questions[index];
    if (!q.title && !q.question) {
      const filtered = quiz.questions.filter((_: any, i: number) => i !== index);
      setQuiz({ ...quiz, questions: filtered });
    }
    setEditingIndex(null);
  };

  const editQuestion = (index: number) => {
    setEditingIndex(index);
  };

  return (
    <div className="questions-editor">

      {/* Question type dropdown and button */}
      <div className="d-flex gap-2 align-items-center mb-3">
        <select
          className="form-select w-auto"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        >
          <option>Multiple Choice</option>
          <option>True/False</option>
          <option>Fill in the Blank</option>
        </select>

        <Button variant="outline-primary" onClick={addQuestion}>
          New Question
        </Button>
      </div>

      {quiz.questions?.map((q: any, idx: number) => (
        <Card key={q.id || idx} className="mb-2 p-2">
          {editingIndex === idx ? (
            q.type === "Multiple Choice" ? (
              <MultipleChoiceEditor
                question={q}
                onSave={(updated) => saveQuestion(updated, idx)}
                onCancel={() => cancelEdit(idx)}
              />
            ) : q.type === "True/False" ? (
              <TrueFalseEditor
                question={q}
                onSave={(updated) => saveQuestion(updated, idx)}
                onCancel={() => cancelEdit(idx)}
              />
            ) : (
              <FillBlankEditor
                question={q}
                onSave={(updated) => saveQuestion(updated, idx)}
                onCancel={() => cancelEdit(idx)}
              />
            )
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{q.title || "Untitled Question"}</strong> ({q.type})
              </div>
              <Button size="sm" onClick={() => editQuestion(idx)}>
                Edit
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
