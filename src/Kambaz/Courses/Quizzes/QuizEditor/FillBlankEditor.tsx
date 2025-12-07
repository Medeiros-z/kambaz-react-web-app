import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function FillBlankEditor({
  question,
  onSave,
  onCancel,
}: {
  question: any;
  onSave: (q: any) => void | Promise<void>;
  onCancel: () => void;
}) {
  const [local, setLocal] = useState<any>({ ...question });

  const addAnswer = () =>
    setLocal({ ...local, answers: [...(local.answers || []), ""] });

  const setAnswer = (idx: number, val: string) =>
    setLocal({
      ...local,
      answers: local.answers.map((a: string, i: number) => (i === idx ? val : a)),
    });

  const removeAnswer = (idx: number) =>
    setLocal({ ...local, answers: local.answers.filter((_a: any, i: number) => i !== idx) });

  return (
    <div className="fill-blank-editor p-3 border rounded">
      <Form.Group className="mb-2">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={local.title}
          onChange={(e) => setLocal({ ...local, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2 w-25">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={local.points}
          onChange={(e) => setLocal({ ...local, points: Number(e.target.value) })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={local.question}
          onChange={(e) => setLocal({ ...local, question: e.target.value })}
        />
      </Form.Group>

      <div>
        <Form.Label>Possible Answers (case-insensitive)</Form.Label>
        {local.answers?.map((a: string, idx: number) => (
          <InputGroup className="mb-2" key={idx}>
            <Form.Control
              value={a}
              onChange={(e) => setAnswer(idx, e.target.value)}
            />
            <Button variant="outline-danger" onClick={() => removeAnswer(idx)}>
              Remove
            </Button>
          </InputGroup>
        ))}

        <div className="mt-2">
          <Button size="sm" onClick={addAnswer} variant="outline-primary">
            Add Answer
          </Button>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave(local)}>
          Save Question
        </Button>
      </div>
    </div>
  );
}
