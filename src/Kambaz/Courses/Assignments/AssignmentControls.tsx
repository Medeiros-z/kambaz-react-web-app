import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import AssignmentEditor from "./Editor";

export default function AssignmentControls(
    { assignmentName, setAssignmentName, addAssignment }:
    { assignmentName: string; setAssignmentName: (title: string) => void; addAssignment: () => void; }) {

  // ---------- NO LONGER NEED LOCAL SHOW STATE HERE ----------
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <div id="wd-assignments-controls" className="d-flex gap-2">
      <Button
        onClick={addAssignment} // UPDATED: directly call prop to open editor
        id="wd-add-assignment"
        variant="danger"
        className="d-flex align-items-center">
        <BsPlusLg className="me-1" /> Assignment
      </Button>
      {/* ---------- REMOVE LOCAL EDITOR MODAL FROM HERE ---------- */}
    </div>
  );
}
