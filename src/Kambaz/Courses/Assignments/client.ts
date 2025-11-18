import axios from "axios";

const HTTP_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  // use the assignment's _id property (server uses _id)
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};




// export const SERVER = import.meta.env.VITE_REMOTE_SERVER;

// export const findAssignmentsForCourse = async (courseId: string) => {
//   const response = await axios.get(`${SERVER}/api/courses/${courseId}/assignments`);
//   return response.data;
// };

// export const findAssignmentById = async (assignmentId: string) => {
//   const response = await axios.get(`${SERVER}/api/assignments/${assignmentId}`);
//   return response.data;
// };

// export const createAssignment = async (courseId: string, assignment: any) => {
//   const response = await axios.post(
//     `${SERVER}/api/courses/${courseId}/assignments`,
//     assignment
//   );
//   return response.data;
// };

// export const updateAssignment = async (assignmentId: string, assignment: any) => {
//   const response = await axios.put(
//     `${SERVER}/api/assignments/${assignmentId}`,
//     assignment
//   );
//   return response.data;
// };

// export const deleteAssignment = async (assignmentId: string) => {
//   const response = await axios.delete(
//     `${SERVER}/api/assignments/${assignmentId}`
//   );
//   return response.data;
// };
