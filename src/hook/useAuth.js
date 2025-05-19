const TOKEN_STORAGE_KEY = "@TRAVEL_VISTA";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

const onLogout = () => {
  removeToken();
  window.location.href = "/auth/login";
};

const useAuth = () => {
  return {
    setToken,
    getToken,
    removeToken,
    isAuthenticated: isAuthenticated(),
    onLogout,
  };
};

export default useAuth;
