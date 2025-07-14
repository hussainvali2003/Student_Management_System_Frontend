import api from "./api";

export const getAttendance = async () => {
  const res = await api.get("/attendance");
  return res.data;
};

export const createAttendance = async (attendance) => {
  const res = await api.post("/attendance", attendance);
  return res.data;
};

export const updateAttendance = async (id, attendance) => {
  const res = await api.put(`/attendance/${id}`, attendance);
  return res.data;
};

export const deleteAttendance = async (id) => {
  await api.delete(`/attendance/${id}`);
};
