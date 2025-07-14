 

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { 
  FiUsers, FiBook, FiCalendar, 
  FiUser, FiClipboard, FiLogOut,
  FiAward, FiHome, FiSettings
} from "react-icons/fi";
import "./Styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Unauthorized access. Please login.");
      navigate("/");
    }
  }, [navigate, user]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getRoleColor = () => {
    switch(user.role) {
      case "ADMIN": return "#ef233c"; // Red
      case "FACULTY": return "#4895ef"; // Blue
      case "STUDENT": return "#4cc9f0"; // Teal
      default: return "#6c757d"; // Gray
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar" style={{ backgroundColor: getRoleColor() }}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h3>{user.role} Portal</h3>
        </div>
        
        <nav className="sidebar-nav">
          {user.role === "ADMIN" && (
            <>
              <Link to="/students" className="nav-item">
                <FiUsers className="nav-icon" />
                <span>Manage Students</span>
              </Link>
              <Link to="/manage-faculty" className="nav-item">
                <FiUser className="nav-icon" />
                <span>Manage Faculty</span>
              </Link>
              <Link to="/courses" className="nav-item">
                <FiBook className="nav-icon" />
                <span>Manage Courses</span>
              </Link>
              <Link to="/enrollments" className="nav-item">
                <FiClipboard className="nav-icon" />
                <span>Enrollments</span>
              </Link>
              <Link to="/grades" className="nav-item">
                <FiAward className="nav-icon" />
                <span>Manage Grades</span>
              </Link>
              <Link to="/attendance" className="nav-item">
                <FiCalendar className="nav-icon" />
                <span>Attendance</span>
              </Link>
            </>
          )}

          {user.role === "FACULTY" && (
            <>
              <Link to="/grades" className="nav-item">
                <FiAward className="nav-icon" />
                <span>Manage Grades</span>
              </Link>
              <Link to="/attendance" className="nav-item">
                <FiCalendar className="nav-icon" />
                <span>Attendance</span>
              </Link>
              <Link to="/my-profile" className="nav-item">
                <FiUser className="nav-icon" />
                <span>My Profile</span>
              </Link>
            </>
          )}

          {user.role === "STUDENT" && (
            <>
              <Link to="/my-profile" className="nav-item">
                <FiUser className="nav-icon" />
                <span>My Profile</span>
              </Link>
              <Link to="/my-courses" className="nav-item">
                <FiBook className="nav-icon" />
                <span>My Courses</span>
              </Link>
              <Link to="/my-grades" className="nav-item">
                <FiAward className="nav-icon" />
                <span>My Grades</span>
              </Link>
              <Link to="/my-attendance" className="nav-item">
                <FiCalendar className="nav-icon" />
                <span>My Attendance</span>
              </Link>
            </>
          )}
        </nav>
        
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut className="nav-icon" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="user-info">
            <h2>
              Welcome back, <span>{user.username}</span>
            </h2>
            <p>
              <span className="role-badge" style={{ backgroundColor: getRoleColor() }}>
                {user.role}
              </span>
            </p>
          </div>
          <div className="quick-stats">
            {user.role === "ADMIN" && (
              <>
                <div className="stat-card">
                  <span className="stat-value">142</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">24</span>
                  <span className="stat-label">Faculty</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">32</span>
                  <span className="stat-label">Courses</span>
                </div>
              </>
            )}
            {user.role === "FACULTY" && (
              <>
                <div className="stat-card">
                  <span className="stat-value">45</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">4</span>
                  <span className="stat-label">Courses</span>
                </div>
              </>
            )}
            {user.role === "STUDENT" && (
              <>
                <div className="stat-card">
                  <span className="stat-value">5</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">3.8</span>
                  <span className="stat-label">GPA</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          {user.role === "ADMIN" && (
            <>
              <Link to="/students" className="dashboard-card students-card">
                <div className="card-icon">
                  <FiUsers size={28} />
                </div>
                <h3>Students</h3>
                <p>Manage student records</p>
                <div className="card-badge">5 New</div>
              </Link>

              <Link to="/manage-faculty" className="dashboard-card faculty-card">
                <div className="card-icon">
                  <FiUser size={28} />
                </div>
                <h3>Faculty</h3>
                <p>Manage faculty members</p>
                <div className="card-badge">2 Pending</div>
              </Link>

              <Link to="/courses" className="dashboard-card courses-card">
                <div className="card-icon">
                  <FiBook size={28} />
                </div>
                <h3>Courses</h3>
                <p>Manage course offerings</p>
                <div className="card-badge">3 Updates</div>
              </Link>
            </>
          )}

          {user.role === "FACULTY" && (
            <>
              <Link to="/grades" className="dashboard-card grades-card">
                <div className="card-icon">
                  <FiAward size={28} />
                </div>
                <h3>Grades</h3>
                <p>Manage student grades</p>
                <div className="card-badge">12 Pending</div>
              </Link>

              <Link to="/attendance" className="dashboard-card attendance-card">
                <div className="card-icon">
                  <FiCalendar size={28} />
                </div>
                <h3>Attendance</h3>
                <p>Mark and review records</p>
                <div className="card-badge">Today's Class</div>
              </Link>

              <Link to="/my-profile" className="dashboard-card profile-card">
                <div className="card-icon">
                  <FiUser size={28} />
                </div>
                <h3>Profile</h3>
                <p>Update your information</p>
                <div className="card-badge">80% Complete</div>
              </Link>
            </>
          )}

          {user.role === "STUDENT" && (
            <>
              <Link to="/my-courses" className="dashboard-card courses-card">
                <div className="card-icon">
                  <FiBook size={28} />
                </div>
                <h3>My Courses</h3>
                <p>View your course schedule</p>
                <div className="card-badge">Current Term</div>
              </Link>

              <Link to="/my-grades" className="dashboard-card grades-card">
                <div className="card-icon">
                  <FiAward size={28} />
                </div>
                <h3>My Grades</h3>
                <p>View your academic progress</p>
                <div className="card-badge">3.8 GPA</div>
              </Link>

              <Link to="/my-attendance" className="dashboard-card attendance-card">
                <div className="card-icon">
                  <FiCalendar size={28} />
                </div>
                <h3>Attendance</h3>
                <p>View your attendance record</p>
                <div className="card-badge">95% Rate</div>
              </Link>
            </>
          )}
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {user.role === "ADMIN" && (
              <>
                <div className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-content">
                    <p>Approved 5 new student applications</p>
                    <small>Today, 9:30 AM</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">👨‍🏫</div>
                  <div className="activity-content">
                    <p>Added new faculty member: Dr. Smith</p>
                    <small>Yesterday, 3:45 PM</small>
                  </div>
                </div>
              </>
            )}
            {user.role === "FACULTY" && (
              <>
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
              </>
            )}
            {user.role === "STUDENT" && (
              <>
                <div className="activity-item">
                  <div className="activity-icon">📚</div>
                  <div className="activity-content">
                    <p>Registered for Spring 2023 courses</p>
                    <small>Today, 11:20 AM</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">🏆</div>
                  <div className="activity-content">
                    <p>Received grade for Math-201: A</p>
                    <small>Yesterday, 4:15 PM</small>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;