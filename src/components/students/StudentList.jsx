// StudentList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService";
import './styles/StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    password: ""
  });
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError("Failed to load students. Please try again.");
      console.error("Error loading students", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editing) {
        await updateStudent(form.id, form);
      } else {
        await createStudent(form);
      }
      setForm({ id: null, firstName: "", lastName: "", email: "", department: "", password: "" });
      setEditing(false);
      await loadStudents();
    } catch (err) {
      setError("Failed to save student. Please try again.");
      console.error("Error saving student", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    setIsLoading(true);
    try {
      await deleteStudent(id);
      await loadStudents();
    } catch (err) {
      setError("Failed to delete student. Please try again.");
      console.error("Error deleting student", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-management">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="management-header">
        <h2>Student Management</h2>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="student-form-container">
        <form onSubmit={handleSubmit} className="student-form">
          <h3>{editing ? "Edit Student" : "Add New Student"}</h3>

          <div className="form-group">
            <label>First Name</label>
            <input
              placeholder="Enter first name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              placeholder="Enter last name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              placeholder="Enter department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="Set password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editing}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : editing ? "Update Student" : "Add Student"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setForm({ id: null, firstName: "", lastName: "", email: "", department: "", password: "" });
                  setEditing(false);
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="student-list-container">
        {isLoading && students.length === 0 ? (
          <div className="loading-spinner">Loading...</div>
        ) : students.length === 0 ? (
          <div className="no-students">No students found</div>
        ) : (
          <div className="table-responsive">
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>{student.password}</td>
                    <td className="actions">
                      <button
                        onClick={() => handleEdit(student)}
                        className="edit-btn"
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="delete-btn"
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;