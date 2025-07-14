import api from "./api";

export const getStudents = async () => {
  const res = await api.get("/students");
  return res.data;
};

export const getStudent = async (id) => {
  const res = await api.get(`/students/${id}`);
  return res.data;
};

export const createStudent = async (student) => {
  const res = await api.post("/students", student);
  return res.data;
};

export const updateStudent = async (id, student) => {
  const res = await api.put(`/students/${id}`, student);
  return res.data;
};

export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
};
