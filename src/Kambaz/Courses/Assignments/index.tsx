import { ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlusLg, BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(a => a.course == cid);
  return (
    <div id="wd-assignments" className="p-3">
      {/* Top Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search */}
        <InputGroup className="w-50">
          <InputGroup.Text>
            <BsSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>

        {/* Action buttons */}
        <div className="d-flex gap-2">
          <Button
            id="wd-add-assignment-group"
            variant="secondary"
            className="d-flex align-items-center"
          >
            <BsPlusLg className="me-1" /> Group
          </Button>
          <Button
            id="wd-add-assignment"
            variant="danger"
            className="d-flex align-items-center"
          >
            <BsPlusLg className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignment Section */}
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          {/* Section Header */}
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <Button variant="light" size="sm">
              <BsPlusLg />
            </Button>
          </div>

          {/* Assignment Items */}
          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment) => (
              <ListGroup.Item
                key={assignment._id}
                className="p-3 ps-1 border-start border-success border-4"
              >
                <BsGripVertical className="me-2 fs-3" />
                <Link
                  to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link fw-bold text-dark text-decoration-none"
                >
                  {assignment.title}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
