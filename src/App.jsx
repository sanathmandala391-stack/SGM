import React from "react";
import LandingPage from "./SGM/pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Courses from "./SGM/pages/Courses";
import Class from "./SGM/pages/Class";
import Lab from "./SGM/pages/Lab";
import Facilities from "./SGM/pages/Facilities";
import Faculty from "./SGM/pages/Faculty";
import StudentPortal from "./SGM/pages/StudentPortal";
import ProtectedRoute from "./SGM/components/routes/ProtectedRoute";
import StudentLogin from "./SGM/components/forms/StudentLogin";
import Register from "./SGM/components/forms/Register";
import AllLogin from "./SGM/pages/AllLogin";
import FacultyRegister from "./SGM/components/forms/FacultyRegister";
import FacultyLogin from "./SGM/components/forms/FacultyLogin";
import FacultyServices from "./SGM/pages/FacultyServices";
import FacultyRoute from "./SGM/components/routes/FacultyRoute";
import AdminRegister from "./SGM/components/forms/AdminRegister";
import AdminLogin from "./SGM/components/forms/AdminLogin";
import Admin from "./SGM/pages/Admin";
import AdminProtectedRoute from "./SGM/components/routes/AdminProtectedRoute";
import StudentForgotPassword from "./SGM/pages/StudentForgotPassword";
import StudentResetPassword from "./SGM/pages/StudentResetPassword";
import FacultyForgotPassword from "./SGM/pages/FacultyForgotPassword";
import FacultyResetPassword from "./SGM/pages/FacultyResetPassword";
import AdminReset from "./SGM/pages/AdminReset";
import AdminForgot from "./SGM/pages/AdminForgot";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/classes" element={<Class />} />
        <Route path="/labs" element={<Lab />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/faculty" element={<Faculty />} />
       <Route path="/allLogin" element={<AllLogin/>}></Route>
         <Route path="/register" element={<Register />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/facultyregister" element={<FacultyRegister/>}></Route>
        <Route path="/facultylogin" element={<FacultyLogin />} />
        <Route path="/adminRegister" element={<AdminRegister/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route path="/studentForgotPassword" element={<StudentForgotPassword />} />
<Route path="/studentResetPassword" element={<StudentResetPassword />} />
<Route path="/facultyForgotPassword" element={<FacultyForgotPassword />} />
<Route path="/facultyResetPassword" element={<FacultyResetPassword/>}/>
<Route path="/adminResetPassword" element={<AdminReset/>}/>
<Route path="/adminForgotPassword" element={<AdminForgot/>}/>

        

        <Route
          path="/studentPortal"
          element={
            <ProtectedRoute>
              <StudentPortal />
            </ProtectedRoute>
          }
        />

        <Route
        path="/facultyservices" element={<FacultyRoute>
          <FacultyServices/>
        </FacultyRoute>
        }
        />

              <Route path="/admin" element={<AdminProtectedRoute>
<Admin/>

      </AdminProtectedRoute>
    
    }>

      </Route>
      </Routes>
      

    </>
  );
}

export default App;