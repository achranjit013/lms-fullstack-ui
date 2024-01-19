import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/user-login-signup/Login";
import Signup from "./pages/user-login-signup/Signup";
import AdminSignup from "./pages/admin-signup/AdminSignup";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard/Dashboard";
import {
  AdminPrivateRouter,
  UserPrivateRouter,
} from "./components/private-router/PrivateRouter";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* private routes */}
        <Route
          path="/admin-signup"
          element={
            <AdminPrivateRouter>
              <AdminSignup />
            </AdminPrivateRouter>
          }
        />
        <Route
          path="/dashboard"
          element={
            <UserPrivateRouter>
              <Dashboard />
            </UserPrivateRouter>
          }
        />
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
