import axios from "axios";
import { getToken } from "./authservice";

const BASE_URL = "http://localhost:8080/wisewallet/transactions";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const addTransaction = (object) => {
  return axios.post(BASE_URL + "/transfer", object);
};

export const deleteTransaction = (id) => {
  return axios.delete(BASE_URL + "/delete/" + id);
};

export const getUserTransactions = () => {
  return axios.get(BASE_URL + `/`);
};
