 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/ManageFaculty.css";

function ManageFaculty() {
  const navigate = useNavigate();
  const [facultyList, setFacultyList] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/faculty");
      setFacultyList(response.data);
    } catch (error) {
      console.error("Failed to fetch faculty", error);
    }
  };

  const handleChange = (e) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:9090/api/faculty", newFaculty);
      fetchFaculty();
      setNewFaculty({ firstName: "", lastName: "", email: "", password: "", department: "" });
    } catch (error) {
      alert("Error creating faculty", error);
    }
  };

  return (
    <div className="manage-faculty">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Manage Faculty</h2>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back
        </button>
      </div>

      <div className="create-form">
        <input name="firstName" value={newFaculty.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={newFaculty.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="email" value={newFaculty.email} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" value={newFaculty.password} onChange={handleChange} placeholder="Password" />
        <input name="department" value={newFaculty.department} onChange={handleChange} placeholder="Department" />
        <button onClick={handleCreate}>Create Faculty</button>
      </div>

      <div className="faculty-table">
        <h3>Existing Faculty</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((f, index) => (
              <tr key={f.id}>
                <td>{index + 1}</td>
                <td>{f.firstName}</td>
                <td>{f.lastName}</td>
                <td>{f.email}</td>
                <td>{f.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageFaculty;