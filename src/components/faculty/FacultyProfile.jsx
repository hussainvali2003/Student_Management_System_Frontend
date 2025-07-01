// src/components/faculty/FacultyProfile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/FacultyProfile.css";

function FacultyProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="faculty-profile-container">
      <button className="faculty-back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h2>My Profile</h2>
      <div className="faculty-card">
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Department:</strong>{" "}
          <span className="dept-badge">{user.department}</span>
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span className="role-badge">{user.role}</span>
        </p>
      </div>
    </div>
  );
}

export default FacultyProfile;
