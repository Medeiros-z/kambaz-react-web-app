import { Form, Row, Col, Button, Modal } from "react-bootstrap";

export default function AssignmentEditor({
  show,
  handleClose,
  //dialogTitle,
  assignmentName,
  setAssignmentName,
  addAssignment
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  addAssignment: () => void;
}) {

  return (
    <Modal show={show} onHide={handleClose}>
      <div id="wd-assignments-editor" className="p-3">
        <Form>
          {/* Assignment Name */}
          <Form.Group className="mb-3" controlId="wd-name">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignmentName} // UPDATED: use controlled input
              onChange={(e) => setAssignmentName(e.target.value)} // UPDATED
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="wd-description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              // You can add controlled binding for description if desired
              defaultValue=""
            />
          </Form.Group>

          {/* Points and Dates */}
          <Row className="mb-3">
            <Col md={2}>
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" defaultValue={100} />
            </Col>
            <Col>
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Col>
          </Row>

          {/* Action Buttons */}
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="danger" onClick={addAssignment}>Save</Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
