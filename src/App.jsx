import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Devices from "./pages/Devices/Devices";
import Copy from "./pages/Copy/Copy";
import Frame from "./pages/Frame/Frame";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./../src/utils/ProtectedRoute";
import Payment from "./pages/Payment/Payment";
import Coupons from "./pages/Coupons/Coupons";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="devices" element={<Devices />} />
            <Route path="copy" element={<Copy />} />
            <Route path="frame" element={<Frame />} />
            <Route path="payment" element={<Payment />} />
            <Route path="coupon" element={<Coupons />} />
          </Route>
        </Route>

        {/* Redirect all unknown routes to /admin */}
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
