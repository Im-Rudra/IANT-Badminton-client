/* eslint-disable react-hooks/rules-of-hooks */
import useAuth from '../hooks/useAuth';

const checkAccessiblity = (authType) => {
  const { user } = useAuth();
  const authSchema = {
    Administrator: ['Administrator'],
    Moderator: ['Administrator', 'Moderator'],
    User: ['Administrator', 'Moderator', 'User']
  };

  if (!authSchema[authType]?.includes(user?.role)) {
    return false;
  }
  return true;
};

export default checkAccessiblity;
