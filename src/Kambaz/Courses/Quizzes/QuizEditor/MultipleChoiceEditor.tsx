import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function MultipleChoiceEditor({
  question,
  onSave,
  onCancel,
}: {
  question: any;
  onSave: (q: any) => void | Promise<void>;
  onCancel: () => void;
}) {
  const [local, setLocal] = useState<any>({ ...question });

  const setChoiceText = (idx: number, text: string) =>
    setLocal({
      ...local,
      choices: local.choices.map((c: any, i: number) =>
        i === idx ? { ...c, text } : c
      ),
    });

  const addChoice = () =>
    setLocal({ ...local, choices: [...(local.choices || []), { text: "", correct: false }] });

  const removeChoice = (idx: number) =>
    setLocal({
      ...local,
      choices: local.choices.filter((_c: any, i: number) => i !== idx),
    });

  const markCorrect = (idx: number) =>
    setLocal({
      ...local,
      choices: local.choices.map((c: any, i: number) => ({ ...c, correct: i === idx })),
    });

  return (
    <div className="multiple-choice-editor p-3 border rounded">
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
        <Form.Label>Choices</Form.Label>
        {local.choices?.map((c: any, idx: number) => (
          <InputGroup className="mb-2" key={idx}>
            <InputGroup.Text>
              <Form.Check
                type="radio"
                name={`choice-${question._id}`}
                checked={!!c.correct}
                onChange={() => markCorrect(idx)}
              />
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={1}
              value={c.text}
              onChange={(e) => setChoiceText(idx, e.target.value)}
            />
            <Button variant="outline-danger" onClick={() => removeChoice(idx)}>
              Remove
            </Button>
          </InputGroup>
        ))}

        <div className="mt-2">
          <Button onClick={addChoice} variant="outline-primary" size="sm">
            Add Choice
          </Button>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            // ensure there's exactly one correct
            if (!(local.choices || []).some((c: any) => c.correct)) {
              // default first correct
              local.choices = local.choices.map((c: any, i: number) => ({ ...c, correct: i === 0 }));
            }
            onSave(local);
          }}
        >
          Save Question
        </Button>
      </div>
    </div>
  );
}
