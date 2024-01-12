export const setToken = (token) => {
  localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, JSON.stringify(token));
};

export const getToken = () => {
  const rawToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
  return rawToken;
};

export const setSession = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getSession = () => {
  const session = sessionStorage.getItem('user');
  return JSON.parse(session);
};
