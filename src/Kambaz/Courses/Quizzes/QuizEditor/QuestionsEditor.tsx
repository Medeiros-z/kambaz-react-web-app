import React, { useState } from "react";
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

  const addQuestion = () => {
    const newQuestion = {
      id: `q_${Date.now()}`,
      type: "Multiple Choice",
      title: "",
      question: "",
      points: 1,
      choices: ["", ""], // default two choices for multiple choice
      correctChoice: 0,
      answers: [], // for fill in the blank
      correctAnswer: true, // for true/false
    };
    const updatedQuestions = [...(quiz.questions || []), newQuestion];
    setQuiz({ ...quiz, questions: updatedQuestions });
    setEditingIndex(updatedQuestions.length - 1);
  };

  const saveQuestion = (question: any, index: number) => {
    const updatedQuestions = quiz.questions.map((q: any, i: number) =>
      i === index ? question : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
    setEditingIndex(null);
  };

  const cancelEdit = (index: number) => {
    // If a newly added question is cancelled, remove it
    if (quiz.questions[index].title === "" && quiz.questions[index].question === "") {
      const updatedQuestions = quiz.questions.filter((_: any, i: number) => i !== index);
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
    setEditingIndex(null);
  };

  const editQuestion = (index: number) => {
    setEditingIndex(index);
  };

  return (
    <div className="questions-editor">
      <Button variant="outline-primary" className="mb-3" onClick={addQuestion}>
        New Question
      </Button>

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
