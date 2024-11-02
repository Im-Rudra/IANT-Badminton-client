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

/**
 * 
 * @param {string} envKey string
 * @description envKey is just the key excluding "REACT_APP_"
 * if the main key is "REACT_APP_SERVER_ORIGIN"
 * then you can pass the envKey as just "SERVER_ORIGIN"
 */
export const getEnv = (envKey) => process.env[`REACT_APP_${envKey}`];
