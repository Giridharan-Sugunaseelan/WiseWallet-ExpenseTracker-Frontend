import axios from "axios";

const BASE_URL = "http://localhost:8080/wisewallet/user";

export const getUserByEmail = () => {
  return axios.get(BASE_URL + "/email");
};
