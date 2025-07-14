import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEnrollments,
  createEnrollment,
  deleteEnrollment,
} from "../../services/enrollmentService";
import "./EnrollmentList.css";

function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    semester: "",
    enrollmentDate: "",
    studentId: "",
    courseId: "",
  });
  const navigate = useNavigate();

  const loadEnrollments = async () => {
    const data = await getEnrollments();
    setEnrollments(data);
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEnrollment(form);
    setForm({
      semester: "",
      enrollmentDate: "",
      studentId: "",
      courseId: "",
    });
    loadEnrollments();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to unenroll this student?")) {
      await deleteEnrollment(id);
      loadEnrollments();
    }
  };

  return (
    <div className="enrollment-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2 className="heading">Enrollment Management</h2>

      <form onSubmit={handleSubmit} className="enrollment-form">
        <div className="form-group">
          <label>Semester</label>
          <input
            name="semester"
            placeholder="Semester"
            value={form.semester}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Enrollment Date</label>
          <input
            name="enrollmentDate"
            type="date"
            value={form.enrollmentDate}
            onChange={handleChange}
            required
          />
        </div>

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

        <button type="submit" className="submit-button">Enroll</button>
      </form>

      <div className="enrollment-table-container">
        <table className="enrollment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Semester</th>
              <th>Enrollment Date</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No enrollments found.</td>
              </tr>
            ) : (
              enrollments.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.semester}</td>
                  <td>{e.enrollmentDate}</td>
                  <td>{e.studentId}</td>
                  <td>{e.courseId}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(e.id)}
                    >
                      Unenroll
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

export default EnrollmentList;
