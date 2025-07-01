import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";
import "./CourseList.css";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    id: null,
    courseCode: "",
    courseName: "",
    credit: ""
  });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const loadCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      ...form,
      credit: parseInt(form.credit, 10)
    };

    if (editing) {
      await updateCourse(form.id, courseData);
    } else {
      await createCourse(courseData);
    }

    setForm({ id: null, courseCode: "", courseName: "", credit: "" });
    setEditing(false);
    loadCourses();
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      loadCourses();
    }
  };

  return (
    <div className="course-list-container">
      <button 
        className="back-button" 
        type="button" 
        onClick={() => navigate(-1)} 
        aria-label="Go back to previous page"
      >
        &larr; Back
      </button>

      <h2 id="course-list-heading" className="course-list-heading">Course Management</h2>

      <form onSubmit={handleSubmit} className="course-form" aria-labelledby="course-list-heading">
        <div className="form-group">
          <label htmlFor="courseCode">Course Code</label>
          <input
            id="courseCode"
            name="courseCode"
            placeholder="Course Code"
            value={form.courseCode}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            name="courseName"
            placeholder="Course Name"
            value={form.courseName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="credit">Credit</label>
          <input
            id="credit"
            name="credit"
            type="number"
            placeholder="Credit"
            value={form.credit}
            onChange={handleChange}
            required
            className="form-input"
            min="0"
          />
        </div>

        <button type="submit" className="submit-button">
          {editing ? "Update" : "Add"} Course
        </button>
      </form>

      <table className="course-table" aria-describedby="course-list-heading">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Course Code</th>
            <th scope="col">Course Name</th>
            <th scope="col">Credit</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No courses available.</td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.credit}</td>
                <td>
                  <button 
                    className="action-button edit-button" 
                    onClick={() => handleEdit(course)}
                    aria-label={`Edit course ${course.courseCode}`}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-button delete-button" 
                    onClick={() => handleDelete(course.id)}
                    aria-label={`Delete course ${course.courseCode}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
