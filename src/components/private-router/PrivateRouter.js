import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// this is for all users
export const UserPrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.userInfo);

  return user?._id ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

// this is for admin only
export const AdminPrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.userInfo);

  if (user?._id && user?.role !== "admin") {
    return <h1>Unauthorized!</h1>;
  }

  return user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
