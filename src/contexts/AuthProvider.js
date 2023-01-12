import { createContext } from 'react';
import useFetchUser from '../hooks/useFetchUser';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const providerValue = useFetchUser();
  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
