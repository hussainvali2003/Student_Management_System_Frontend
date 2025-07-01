import api from "./api";

export const getEnrollments = async () => {
  const res = await api.get("/enrollments");
  return res.data;
};

export const createEnrollment = async (enrollment) => {
  const res = await api.post("/enrollments", enrollment);
  return res.data;
};

export const deleteEnrollment = async (id) => {
  await api.delete(`/enrollments/${id}`);
};
