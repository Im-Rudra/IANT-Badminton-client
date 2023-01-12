import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, role = 'User' }) => {
  const authSchema = {
    Administrator: ['Administrator'],
    Moderator: ['Administrator', 'Moderator'],
    User: ['Administrator', 'Moderator', 'User']
  };

  const isAuthorized = role.includes(authSchema[role]);

  const { user } = useAuth();
  return user?.id && isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
