import axios from "axios";
import authHeader from "./auth-header";

const URL_API = process.env.REACT_APP_URL_API;

const getPublicContent = () => {
  return axios.get(URL_API + "/all");
};

const getUserBoard = () => {
  return axios.get(URL_API + "/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(URL_API + "/modo", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(URL_API + "/admin", { headers: authHeader() });
};

const exported = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default exported;
