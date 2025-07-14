import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/MyGrades.css";

function MyGrades() {
  const [grades, setGrades] = useState([]);
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
      .get(`http://localhost:9090/api/grades/details?studentId=${user.id}`)
      .then((res) => {
        setGrades(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load grades", err);
        setError("Failed to load grades. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grades-loading">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <p>Loading your grades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grades-error">
        <div className="error-icon">!</div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grades-dashboard">
      <div className="grades-header">
        <h1>My Grades</h1>
        <div className="grades-count-badge">
          {grades.length} {grades.length === 1 ? "Grade" : "Grades"}
        </div>
      </div>
      {grades.length === 0 ? (
        <div className="empty-grades">
          <div className="empty-illustration"></div>
          <h3>No Grades Available</h3>
          <p>Your grades will appear here once published.</p>
        </div>
      ) : (
        <div className="grades-table-container">
          <div className="table-responsive">
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Grade</th>
                  <th>Student Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, index) => (
                  <tr key={index}>
                    <td>
                      <span className="course-code">{g.courseCode}</span>
                    </td>
                    <td className="course-name">{g.courseName}</td>
                    <td>
                      <span className={`grade-badge grade-${g.grade?.toLowerCase() || "na"}`}>
                        {g.grade || "N/A"}
                      </span>
                    </td>
                    <td>
                      <div className="student-cell">
                        <div className="student-avatar">
                          {g.studentName?.charAt(0)}
                        </div>
                        <div>
                          <div className="student-name">{g.studentName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{g.email}</td>
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

export default MyGrades;
