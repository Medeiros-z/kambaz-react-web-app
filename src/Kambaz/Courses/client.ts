import axios from "axios";
const HTTP_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

// Courses

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// Modules

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

// Assignments 

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios
    .get(`${ASSIGNMENTS_API}/${courseId}/assignments`);
    return response.data;
}

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${ASSIGNMENTS_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};
