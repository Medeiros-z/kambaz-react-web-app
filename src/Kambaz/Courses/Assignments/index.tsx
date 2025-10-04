import { ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlusLg, BsSearch } from "react-icons/bs";

export default function Assignments() {
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
          {/* Assignment group title */}
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS 40% of Total
            </div>
            <Button variant="light" size="sm">
              <BsPlusLg />
            </Button>
          </div>

          {/* Assignment items */}
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="p-3 ps-1 border-start border-success border-4">
              <BsGripVertical className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/123"
                className="wd-assignment-link fw-bold text-dark text-decoration-none"
              >
                A1 - ENV + HTML
              </a>
              <div className="text-muted small mt-1">
                Multiple Modules | Not available until May 6 at 12:00am | Due
                May 13 at 11:59pm | 100 pts
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="p-3 ps-1 border-start border-success border-4">
              <BsGripVertical className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/124"
                className="wd-assignment-link fw-bold text-dark text-decoration-none"
              >
                A2 - CSS + BOOTSTRAP
              </a>
              <div className="text-muted small mt-1">
                Multiple Modules | Not available until May 13 at 12:00am | Due
                May 20 at 11:59pm | 100 pts
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="p-3 ps-1 border-start border-success border-4">
              <BsGripVertical className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/125"
                className="wd-assignment-link fw-bold text-dark text-decoration-none"
              >
                A3 - JAVASCRIPT + REACT
              </a>
              <div className="text-muted small mt-1">
                Multiple Modules | Not available until May 20 at 12:00am | Due
                May 27 at 11:59pm | 100 pts
              </div>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
