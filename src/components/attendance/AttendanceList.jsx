import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "../../services/attendanceService";
import "./AttendanceList.css";

function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    id: null,
    studentId: "",
    courseId: "",
    date: "",
    status: "PRESENT",
  });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const loadAttendance = async () => {
    const data = await getAttendance();
    setRecords(data);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateAttendance(form.id, form);
    } else {
      await createAttendance(form);
    }
    setForm({ id: null, studentId: "", courseId: "", date: "", status: "PRESENT" });
    setEditing(false);
    loadAttendance();
  };

  const handleEdit = (record) => {
    setForm({
      id: record.id,
      studentId: record.studentId || record.student?.id || "",
      courseId: record.courseId || record.course?.id || "",
      date: record.date,
      status: record.status,
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      await deleteAttendance(id);
      loadAttendance();
    }
  };

  return (
    <div className="attendance-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2 className="attendance-heading">Attendance Management</h2>

      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-group">
          <label>Student ID</label>
          <input
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Course ID</label>
          <input
            name="courseId"
            placeholder="Course ID"
            value={form.courseId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          {editing ? "Update Attendance" : "Mark Attendance"}
        </button>
      </form>

      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No records available.</td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.student?.id || r.studentId}</td>
                  <td>{r.course?.id || r.courseId}</td>
                  <td>{r.date}</td>
                  <td>{r.status}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(r)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(r.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceList;
