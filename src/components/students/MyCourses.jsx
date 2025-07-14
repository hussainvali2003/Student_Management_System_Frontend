import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/MyCourses.css";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("No user data found. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:9090/api/student/enrollment-details?studentId=${user.id}`)
      .then((res) => {
        setCourses(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load courses", err);
        setError("Failed to load courses. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="courses-loading">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <p>Loading your courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-error">
        <div className="error-icon">!</div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="courses-dashboard">
      <div className="courses-header">
        <h1>My Enrolled Courses</h1>
        <div className="courses-count-badge">
          {courses.length} {courses.length === 1 ? "Course" : "Courses"}
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="empty-courses">
          <div className="empty-illustration"></div>
          <h3>No Courses Enrolled</h3>
          <p>You haven't enrolled in any courses yet</p>
          <button className="browse-courses-btn">Browse Available Courses</button>
        </div>
      ) : (
        <div className="courses-table-container">
          <div className="table-responsive">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>
                      <div className="student-cell">
                        <div className="student-avatar">
                          {course.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="student-name">{course.studentName}</div>
                          <div className="student-id">ID: {course.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td>{course.email}</td>
                    <td>
                      <span className="course-code">{course.courseCode}</span>
                    </td>
                    <td className="course-name">{course.courseName}</td>
                    <td>
                      <span className="status-badge active">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCourses;