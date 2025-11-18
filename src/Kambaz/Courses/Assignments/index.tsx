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
  //const [assignments, setAssignments] = useState<any[]>(db.assignments);
  //const assignments = db.assignments.filter(a => a.course == cid);

  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
 
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    console.log("Fetched assignments:", assignments);
    dispatch(setAssignments(assignments));
  }
  useEffect(() => {
    fetchAssignments();
  }, []);
  
  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { title: assignmentName, course: cid };
    const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
  };

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  }

  const [editingAssignment, setEditingAssignment] = useState<any | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div id="wd-assignments" className="p-3">
      {/* Assignment editor button to create a new assignment*/}
      <AssignmentControls setAssignmentName={setAssignmentName} assignmentName={assignmentName}
      addAssignment={createAssignmentForCourse} />

      <br /><br /><br /><br />
      
      <ListGroup id="wd-assignments" className="rounded-0">
        {assignments
          .map((assignment: any) => (
            <ListGroup.Item className="wd-assignment p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!assignment.editing && assignment.title}
                { assignment.editing && (
                  <FormControl className="w-50 d-inline-block"
                    onChange={(e) => dispatch(updateAssignment({ ...assignment, title: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveAssignment({ ...assignment, editing: false});
                      }
                    }}
                    defaultValue={assignment.title}/>
                )}
                
                {/* Edit and delete assignment each assignment on screen */}
                <AssignmentControlButtons 
                  assignmentId={assignment._id}
                  deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
                  editAssignment={(assignmentId) => dispatch(editAssignment(assignmentId))} />

              </div>
            </ListGroup.Item>
          ))
        }
      </ListGroup>

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
              const newAssignment = await createAssignmentForCourse(editingAssignment);
              dispatch(addAssignment(newAssignment));
            }
            setShowEditor(false);
            setEditingAssignment(null);
          }}
        />
      )}

    </div>
  );
}
