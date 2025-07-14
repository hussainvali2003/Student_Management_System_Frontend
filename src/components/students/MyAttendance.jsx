import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/MyAttendance.css";

function MyAttendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setError("No user data found. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:9090/api/attendance/details?studentId=${user.id}`)
      .then((res) => {
        setRecords(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch attendance", err);
        setError("Failed to fetch attendance. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="attendance-loading">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <p>Loading your attendance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attendance-error">
        <div className="error-icon">!</div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="attendance-dashboard">
      <div className="attendance-header">
        <h1>My Attendance</h1>
        <div className="attendance-count-badge">
          {records.length} {records.length === 1 ? "Record" : "Records"}
        </div>
      </div>
      {records.length === 0 ? (
        <div className="empty-attendance">
          <div className="empty-illustration"></div>
          <h3>No Attendance Records</h3>
          <p>Your attendance will appear here once available.</p>
        </div>
      ) : (
        <div className="attendance-table-container">
          <div className="table-responsive">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td>
                      <span className="course-code">{r.courseCode}</span>
                    </td>
                    <td className="course-name">{r.courseName}</td>
                    <td>
                      <span className={`status-badge ${r.status === "PRESENT" ? "present" : "absent"}`}>
                        {r.status}
                      </span>
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

export default MyAttendance;
