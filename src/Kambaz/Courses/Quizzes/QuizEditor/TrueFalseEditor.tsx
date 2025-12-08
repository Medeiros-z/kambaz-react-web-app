import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function TrueFalseEditor({
  question,
  onSave,
  onCancel,
}: {
  question: any;
  onSave: (q: any) => void | Promise<void>;
  onCancel: () => void;
}) {
  const [local, setLocal] = useState<any>({ ...question });

  return (
    <div className="true-false-editor p-3 border rounded">
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

      <Form.Group className="mb-2">
        <Form.Label>Answer</Form.Label>
        <div>
          <Form.Check
            inline
            label="True"
            name="tf"
            type="radio"
            checked={local.answer === true}
            onChange={() => setLocal({ ...local, answer: true })}
          />
          <Form.Check
            inline
            label="False"
            name="tf"
            type="radio"
            checked={local.answer === false}
            onChange={() => setLocal({ ...local, answer: false })}
          />
        </div>
      </Form.Group>

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
