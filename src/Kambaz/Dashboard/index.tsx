import { Link } from "react-router-dom";
import { Card, Button, Row, Col, FormControl } from "react-bootstrap";
import { useState } from "react";

export default function Dashboard({
  courses,
  // course,
  // setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling, 
  setEnrolling,
  updateEnrollment
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: (course: any) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: (course: any) => void;
  enrolling: boolean; 
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  // Local state for editing/creating a course
  const [editingCourse, setEditingCourse] = useState({
    _id: "",
    name: "",
    description: "",
  });

  /** -----------------------------  
   *  ADD COURSE (prop-supplied)
   * ------------------------------ */
  const handleAddCourse = () => {
    if (!editingCourse.name.trim()) return;
    addNewCourse(editingCourse);              // ⬅️ Use parent function
    setEditingCourse({ _id: "", name: "", description: "" });
  };

  /** -----------------------------  
   *  UPDATE COURSE (prop-supplied)
   * ------------------------------ */
  const handleUpdateCourse = () => {
    if (!editingCourse._id) return;
    updateCourse(editingCourse);              // ⬅️ Use parent function
    setEditingCourse({ _id: "", name: "", description: "" });
  };

  /** -----------------------------  
   *  DELETE COURSE (prop-supplied)
   * ------------------------------ */
  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);                 // ⬅️ Use parent function
      if (editingCourse._id === courseId) {
        setEditingCourse({ _id: "", name: "", description: "" });
      }
    }
  };

  /** -----------------------------  
   *  Begin Edit
   * ------------------------------ */
  const handleEditClick = (course: any) => {
    setEditingCourse(course);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />

      <h5>
        New / Edit Course
        <Button className="float-end ms-2" variant="primary" onClick={handleAddCourse}>
          Add
        </Button>
        <Button
          className="float-end"
          variant="warning"
          onClick={handleUpdateCourse}
          disabled={!editingCourse._id}
        >
          Update
        </Button>
      </h5>
      <br />

      <FormControl
        value={editingCourse.name}
        className="mb-2"
        placeholder="Course Name"
        onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        rows={3}
        value={editingCourse.description}
        placeholder="Course Description"
        onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
      />
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {enrolling && (
                        <button onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                        }} 
                        className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>

                    <Button variant="primary">Go</Button>

                    <Button
                      className="btn btn-warning me-2 float-end"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditClick(course);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      className="btn btn-danger float-end"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteCourse(course._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
