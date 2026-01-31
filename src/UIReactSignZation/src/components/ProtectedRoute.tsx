import { Navigate, Outlet } from 'react-router-dom';
import { clearSession, isSessionValid } from '../auth';

const ProtectedRoute = () => {
  if (!isSessionValid()) {
    clearSession();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
