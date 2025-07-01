
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";

// Role Guard
import RequireRole from "./components/auth/RequireRole";

// Admin/Faculty Components
import ManageFaculty from './components/faculty/ManageFaculty';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import StudentList from "./components/students/StudentList";
import CourseList from "./components/courses/CourseList";
import GradeList from "./components/grades/GradeList";
import AttendanceList from "./components/attendance/AttendanceList";
import EnrollmentList from "./components/enrollments/EnrollmentList";
import FacultyProfile from "./components/faculty/FacultyProfile";

// Student Components
import MyProfile from "./components/students/MyProfile";
import MyCourses from "./components/students/MyCourses";
import MyGrades from "./components/students/MyGrades";
import MyAttendance from "./components/students/MyAttendance";

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>404 - Page Not Found</h2>
      <a href="/">Go to Home</a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard and Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireRole allowedRoles={["ADMIN", "FACULTY", "STUDENT"]}>
              <Dashboard />
            </RequireRole>
          }
        />
        <Route
          path="/students"
          element={
            <RequireRole allowedRoles={["ADMIN"]}>
              <StudentList />
            </RequireRole>
          }
        />
        <Route
          path="/faculty"
          element={
            <RequireRole allowedRoles={["FACULTY"]}>
              <FacultyDashboard />
            </RequireRole>
          }
        />
         <Route
    path="/faculty/profile"
    element={
      <RequireRole allowedRoles={["FACULTY"]}>
        <FacultyProfile />
      </RequireRole>
    }
  />
        <Route
          path="/manage-faculty"
          element={
            <RequireRole allowedRoles={["ADMIN"]}>
              <ManageFaculty />
            </RequireRole>
          }
        />
        <Route
          path="/courses"
          element={
            <RequireRole allowedRoles={["ADMIN"]}>
              <CourseList />
            </RequireRole>
          }
        />
        <Route
          path="/grades"
          element={
            <RequireRole allowedRoles={["ADMIN", "FACULTY"]}>
              <GradeList />
            </RequireRole>
          }
        />
        <Route
          path="/attendance"
          element={
            <RequireRole allowedRoles={["ADMIN", "FACULTY"]}>
              <AttendanceList />
            </RequireRole>
          }
        />
        <Route
          path="/enrollments"
          element={
            <RequireRole allowedRoles={["ADMIN"]}>
              <EnrollmentList />
            </RequireRole>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <RequireRole allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </RequireRole>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="grades" element={<MyGrades />} />
          <Route path="attendance" element={<MyAttendance />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

