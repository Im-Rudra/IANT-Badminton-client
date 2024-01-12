import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, role = 'User' }) => {
  const authSchema = {
    User: ['User'],
    Moderator: ['User', 'Moderator'],
    Administrator: ['Administrator', 'Moderator', 'User']
  };

  const { user } = useAuth();
  if (!user?.role) {
    toast.warning('Your are not logged in!');
    return <Navigate to="/login" />;
  }
  const isAuthorized = authSchema[user.role].includes(role);

  if (isAuthorized) {
    return children;
  } else {
    toast.error('You are not Authorized for the route!');
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
