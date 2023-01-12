export const setToken = (token) => {
  localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, JSON.stringify(token));
};

export const getToken = () => {
  const rawToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
  return rawToken;
};
