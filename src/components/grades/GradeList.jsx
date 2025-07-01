import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGrades,
  createGrade,
  updateGrade,
  deleteGrade,
} from "../../services/gradeService";
import "./GradeList.css";

function GradeList() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({
    id: null,
    grade: "",
    studentId: "",
    courseId: "",
  });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const loadGrades = async () => {
    const data = await getGrades();
    setGrades(data);
  };

  useEffect(() => {
    loadGrades();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateGrade(form.id, form);
    } else {
      await createGrade(form);
    }
    setForm({ id: null, grade: "", studentId: "", courseId: "" });
    setEditing(false);
    loadGrades();
  };

  const handleEdit = (grade) => {
    setForm({
      id: grade.id,
      grade: grade.grade,
      studentId: grade.studentId || grade.student?.id || "",
      courseId: grade.courseId || grade.course?.id || "",
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      await deleteGrade(id);
      loadGrades();
    }
  };

  return (
    <div className="grade-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2 className="grade-heading">Grade Management</h2>

      <form onSubmit={handleSubmit} className="grade-form">
        <div className="form-group">
          <label>Grade</label>
          <input
            name="grade"
            placeholder="Grade (e.g. A)"
            value={form.grade}
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

        <button type="submit" className="submit-button">
          {editing ? "Update Grade" : "Add Grade"}
        </button>
      </form>

      <div className="grade-table-container">
        <table className="grade-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Grade</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No grades available.</td>
              </tr>
            ) : (
              grades.map((g) => (
                <tr key={g.id}>
                  <td>{g.id}</td>
                  <td>{g.grade}</td>
                  <td>{g.student?.id || g.studentId}</td>
                  <td>{g.course?.id || g.courseId}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(g)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(g.id)}>
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

export default GradeList;
