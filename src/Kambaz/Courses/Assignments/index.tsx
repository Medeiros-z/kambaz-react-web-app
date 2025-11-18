import { ListGroup, Button, InputGroup, FormControl, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsPlusLg, BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router";
import * as db from "../../Database";
import { useEffect, useState } from "react";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { FaPlus } from "react-icons/fa";
import AssignmentEditor from "./Editor";
import AssignmentControls from "./AssignmentControls";

import { setAssignments, addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // ---------- NEW STATE FOR EDITOR ----------
  const [editingAssignment, setEditingAssignment] = useState<any | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    console.log("Fetched assignments:", assignments);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const createAssignmentForCourse = async (assignmentData: any) => { // UPDATED: accepts assignment object
    if (!cid) return;
    const newAssignment = { ...assignmentData, course: cid };
    const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
    return assignment;
  };

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  return (
    <div id="wd-assignments" className="p-3">
      {/* ---------- TOP BUTTON ---------- */}
      <AssignmentControls
        setAssignmentName={setAssignmentName}
        assignmentName={assignmentName}
        addAssignment={() => { // UPDATED: open editor for new assignment
          setEditingAssignment({ title: assignmentName, course: cid });
          setShowEditor(true);
        }}
      />

      <br /><br /><br /><br />

      <ListGroup id="wd-assignments" className="rounded-0">
        {assignments.map((assignment: any) => (
          <ListGroup.Item key={assignment._id} className="wd-assignment p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!assignment.editing && assignment.title}
              {assignment.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) => dispatch(updateAssignment({ ...assignment, title: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveAssignment({ ...assignment, editing: false });
                    }
                  }}
                  defaultValue={assignment.title}
                />
              )}

              {/* ---------- EDIT & DELETE BUTTONS ---------- */}
              <AssignmentControlButtons
                assignmentId={assignment._id}
                deleteAssignment={() => removeAssignment(assignment._id)}
                editAssignment={() => { // UPDATED: open editor for this assignment
                  setEditingAssignment(assignment);
                  setShowEditor(true);
                }}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* ---------- ASSIGNMENT EDITOR MODAL ---------- */}
      {showEditor && editingAssignment && (
        <AssignmentEditor
          show={showEditor}
          handleClose={() => {
            setShowEditor(false);
            setEditingAssignment(null);
          }}
          dialogTitle={editingAssignment._id ? "Edit Assignment" : "Add Assignment"}
          assignmentName={editingAssignment.title}
          setAssignmentName={(title) =>
            setEditingAssignment({ ...editingAssignment, title })
          }
          addAssignment={async () => {
            if (editingAssignment._id) {
              await saveAssignment(editingAssignment);
            } else {
              await createAssignmentForCourse(editingAssignment);
            }
            setShowEditor(false);
            setEditingAssignment(null);
          }}
        />
      )}
    </div>
  );
}
