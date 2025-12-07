import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/courses/${courseId}/quizzes`
  );
  return data;  // MUST BE ARRAY
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/courses/${courseId}/quizzes`,
    quiz
  );
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quiz._id}`,
    quiz
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/quizzes/${quizId}`
  );
  return data;
};

export const getQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/quizzes/${quizId}`);
  return data;
};

