import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = sessionStorage.getItem('role');

  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/provider-login" replace />;
  }

  return children;
}
