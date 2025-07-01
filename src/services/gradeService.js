import api from "./api";

export const getGrades = async () => {
  const res = await api.get("/grades");
  return res.data;
};

export const createGrade = async (grade) => {
  const res = await api.post("/grades", grade);
  return res.data;
};

export const updateGrade = async (id, grade) => {
  const res = await api.put(`/grades/${id}`, grade);
  return res.data;
};

export const deleteGrade = async (id) => {
  await api.delete(`/grades/${id}`);
};
