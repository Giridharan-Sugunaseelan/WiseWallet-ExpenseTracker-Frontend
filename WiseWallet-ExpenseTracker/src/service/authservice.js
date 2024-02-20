import axios from "axios";

const BASE_URL = "http://localhost:8080/wisewallet";

export const login = (loginObject) => {
  return axios.post(BASE_URL + "/login", loginObject);
};

export const register = (registerObject) => {
  return axios.post(BASE_URL + "/register", registerObject);
};

export const setToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (userName) =>
  sessionStorage.setItem("authenticatedUser", userName);

export const getLoggedInUser = () =>
  sessionStorage.getItem("authenticatedUser");

export const isUserLoggedIn = () => {
  const user = getLoggedInUser();
  if (user === null) {
    return false;
  } else {
    return true;
  }
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload(false);
};

export const resetPassword = (object) => {
  axios.post(BASE_URL + "/reset", object);
};

export const forgotPassword = (email) => {
  axios.get(BASE_URL + "/forgotPassword/" + email);
};

export const forgotResetPassword = (object, token) => {
  axios.put(BASE_URL + "/resetPassword/" + token, object);
};
