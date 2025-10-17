import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  if (!assignment) {
    return <div className="p-3">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        {/* Assignment Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={assignment.description || ""}
          />
        </Form.Group>

        {/* Points and Assignment Group */}
        <Row className="mb-3">
          <Col md={2}>
            <Form.Label>Points</Form.Label>
            <Form.Control type="number" defaultValue={assignment.points || 100} />
          </Col>
          <Col md={4}>
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select defaultValue="assignments">
              <option value="assignments">ASSIGNMENTS</option>
              <option value="exams">EXAMS</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Display Grade As</Form.Label>
            <Form.Select defaultValue="percentage">
              <option value="percentage">Percentage</option>
              <option value="fraction">Fraction</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type */}
        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select defaultValue="online">
            <option value="online">Online</option>
            <option value="in-person">In Person</option>
          </Form.Select>
        </Form.Group>

        {/* Online Entry Options */}
        <Form.Group className="mb-3" controlId="wd-online-entry-options">
          <Form.Label>Online Entry Options</Form.Label>
          <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
          <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
          <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
          <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
          <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
        </Form.Group>

        {/* Assign To */}
        <Form.Group className="mb-3" controlId="wd-assign-to">
          <Form.Label>Assign To</Form.Label>
          <Form.Control type="text" defaultValue="Everyone" />
        </Form.Group>

        {/* Due Date */}
        <Form.Group className="mb-3" controlId="wd-due-date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" defaultValue={assignment.dueDate || ""} />
        </Form.Group>

        {/* Available From / Until */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available From</Form.Label>
              <Form.Control type="date" defaultValue={assignment.availableDate || ""} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control type="date" defaultValue={assignment.untilDate || ""} />
            </Form.Group>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
