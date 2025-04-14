import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Install using `npm install jwt-decode`

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Function to check if JWT is valid
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now(); // Check if token is expired
    } catch (error) {
      return false;
    }
  };

  return isTokenValid(token) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;



