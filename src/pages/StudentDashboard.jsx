 
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FiCamera,
  FiUser,
  FiBook,
  FiAward,
  FiCalendar,
  FiLogOut,
  FiChevronRight
} from "react-icons/fi";
import "./styles/StudentDashboard.css";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setStudent(user);
      if (
        location.pathname === "/student" ||
        location.pathname === "/student-dashboard"
      ) {
        navigate("profile");
      }
      const path = location.pathname.split("/").pop();
      setActiveLink(path);
    }
  }, [location.pathname, navigate]);

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !student?.id) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:9090/api/students/${student.id}/upload-pic`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newPic = response.data.profilePicUrl;
      const updatedStudent = { ...student, profilePicUrl: newPic };
      setStudent(updatedStudent);
      localStorage.setItem("user", JSON.stringify(updatedStudent));
    } catch (err) {
      console.error("Profile upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!student)
    return (
      <div className="loading-screen">Loading dashboard...</div>
    );

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <aside className="student-sidebar">
        <div className="sidebar-header">
          <div className="student-avatar-wrapper">
            {student.profilePicUrl ? (
              <img
                src={`http://localhost:9090/uploads/${student.profilePicUrl}`}
                alt="Profile"
                className="student-avatar-img"
              />
            ) : (
              <div className="student-avatar">
                {student.firstName?.charAt(0)}
                {student.lastName?.charAt(0)}
              </div>
            )}
            <button
              className="profile-pic-upload-btn"
              onClick={handleProfilePicClick}
              title="Change profile picture"
              disabled={uploading}
              type="button"
            >
              <FiCamera />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && (
              <div className="uploading-overlay">Uploading...</div>
            )}
          </div>
          <h3>Student Portal</h3>
          <div className="student-name">{student.firstName} {student.lastName}</div>
          <div className="student-id">ID: {student.id}</div>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="profile"
            className={`nav-item ${activeLink === "profile" ? "active" : ""}`}
            onClick={() => setActiveLink("profile")}
          >
            <FiUser className="nav-icon" />
            <span>My Profile</span>
          </Link>
          <Link
            to="courses"
            className={`nav-item ${activeLink === "courses" ? "active" : ""}`}
            onClick={() => setActiveLink("courses")}
          >
            <FiBook className="nav-icon" />
            <span>My Courses</span>
          </Link>
          <Link
            to="grades"
            className={`nav-item ${activeLink === "grades" ? "active" : ""}`}
            onClick={() => setActiveLink("grades")}
          >
            <FiAward className="nav-icon" />
            <span>My Grades</span>
          </Link>
          <Link
            to="attendance"
            className={`nav-item ${activeLink === "attendance" ? "active" : ""}`}
            onClick={() => setActiveLink("attendance")}
          >
            <FiCalendar className="nav-icon" />
            <span>My Attendance</span>
          </Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="nav-icon" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="student-main">
        <div className="top-bar">
          <div className="user-info">
            <h2>
              Welcome, <span>{student.firstName} {student.lastName}</span>
            </h2>
            <p>
              <span className="department-badge">{student.department} Department</span>
            </p>
          </div>
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
