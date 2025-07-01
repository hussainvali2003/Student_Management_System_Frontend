import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiBook, FiCalendar, FiUser, 
  FiLogOut
} from "react-icons/fi";
import "./styles/FacultyDashboard.css";

function FacultyDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // or use your login route
  };

  return (
    <div className="faculty-dashboard">
      {/* Sidebar Navigation */}
      <aside className="faculty-sidebar">
        <div className="sidebar-header">
          <div className="faculty-avatar">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <h3>Faculty Portal</h3>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/faculty/profile" className="nav-item active">
            <FiUser className="nav-icon" />
            <span>My Profile</span>
          </Link>
          <Link to="/grades" className="nav-item">
            <FiBook className="nav-icon" />
            <span>Manage Grades</span>
          </Link>
          <Link to="/attendance" className="nav-item">
            <FiCalendar className="nav-icon" />
            <span>Attendance</span>
          </Link>
        </nav>
        
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="nav-icon" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="faculty-main">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="user-info">
            <h2>
              Welcome back, <span>{user.firstName} {user.lastName}</span>
            </h2>
            <p>
              <span className="department-badge">{user.department} Department</span>
            </p>
          </div>
          <div className="quick-stats">
            <div className="stat-card">
              <span className="stat-value">24</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">5</span>
              <span className="stat-label">Courses</span>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <Link to="/grades" className="dashboard-card grade-card">
            <div className="card-icon">
              <FiBook size={28} />
            </div>
            <h3>Manage Grades</h3>
            <p>View and update student grades</p>
            <div className="card-badge">3 Pending</div>
          </Link>

          <Link to="/attendance" className="dashboard-card attendance-card">
            <div className="card-icon">
              <FiCalendar size={28} />
            </div>
            <h3>Attendance</h3>
            <p>Mark and review records</p>
            <div className="card-badge">Today's Class</div>
          </Link>

          <Link to="/faculty/profile" className="dashboard-card profile-card">
            <div className="card-icon">
              <FiUser size={28} />
            </div>
            <h3>My Profile</h3>
            <p>Update your information</p>
            <div className="card-badge">80% Complete</div>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">✓</div>
              <div className="activity-content">
                <p>Graded CS-101 assignments</p>
                <small>Today, 10:45 AM</small>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📅</div>
              <div className="activity-content">
                <p>Marked attendance for Math-201</p>
                <small>Yesterday, 2:30 PM</small>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FacultyDashboard;
