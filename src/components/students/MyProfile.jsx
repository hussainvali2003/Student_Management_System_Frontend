import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiBook,
  FiCalendar,
  FiPhone,
  FiMapPin,
  FiAward,
  FiLayers
} from "react-icons/fi";
import "./styles/MyProfile.css";

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.id) {
      setLoading(true);
      axios
        .get(`http://localhost:9090/api/students/${user.id}`)
        .then((res) => {
          setProfile(res.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Profile load failed", err);
          setError("Failed to load profile. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No user data found. Please login again.");
    }
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  if (!profile) return null;

  return (
    <div className="profile-container">
      <div className="profile-frame">
        <div className="profile-header">
          <div className="profile-identity">
            <div className="profile-avatar">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </div>
            <div>
              <h1 className="profile-name">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="profile-id">Student ID: {profile.id}</p>
            </div>
          </div>
          <div className="department-tag">
            <FiBook className="department-icon" />
            <span>{profile.department}</span>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-card main-card">
            <div className="card-header">
              <div className="card-icon-container">
                <FiUser className="card-icon" />
              </div>
              <h3>Personal Information</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <div className="info-label">
                  <FiUser className="info-icon" />
                  <span>Full Name</span>
                </div>
                <span className="info-value">
                  {profile.firstName} {profile.lastName}
                </span>
              </div>
              <div className="info-row">
                <div className="info-label">
                  <FiMail className="info-icon" />
                  <span>Email</span>
                </div>
                <span className="info-value">{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="info-row">
                  <div className="info-label">
                    <FiPhone className="info-icon" />
                    <span>Phone</span>
                  </div>
                  <span className="info-value">{profile.phone}</span>
                </div>
              )}
              {profile.address && (
                <div className="info-row">
                  <div className="info-label">
                    <FiMapPin className="info-icon" />
                    <span>Address</span>
                  </div>
                  <span className="info-value">{profile.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <div className="card-icon-container">
                <FiAward className="card-icon" />
              </div>
              <h3>Academic Information</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <div className="info-label">
                  <FiBook className="info-icon" />
                  <span>Department</span>
                </div>
                <span className="info-value">{profile.department}</span>
              </div>
              {profile.enrollmentDate && (
                <div className="info-row">
                  <div className="info-label">
                    <FiCalendar className="info-icon" />
                    <span>Enrollment Date</span>
                  </div>
                  <span className="info-value">
                    {new Date(profile.enrollmentDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {profile.academicYear && (
                <div className="info-row">
                  <div className="info-label">
                    <FiAward className="info-icon" />
                    <span>Academic Year</span>
                  </div>
                  <span className="info-value">{profile.academicYear}</span>
                </div>
              )}
            </div>
          </div>

          {profile.additionalInfo && (
            <div className="profile-card">
              <div className="card-header">
                <div className="card-icon-container">
                  <FiLayers className="card-icon" />
                </div>
                <h3>Additional Information</h3>
              </div>
              <div className="card-content">
                {Object.entries(profile.additionalInfo).map(([key, value]) => (
                  <div className="info-row" key={key}>
                    <div className="info-label">
                      <span>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    </div>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;