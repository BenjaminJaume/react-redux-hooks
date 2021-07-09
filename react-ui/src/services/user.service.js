import axios from "axios";
import authHeader from "./auth-header";

let URL_API = "";
const isDev = process.env.NODE_ENV !== "production";

!isDev
  ? (URL_API = process.env.REACT_APP_URL_API_DEV)
  : (URL_API = process.env.REACT_APP_URL_API);

const getPublicContent = () => {
  return axios.get(URL_API + "/all");
};

const getUserBoard = () => {
  return axios.get(URL_API + "/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(URL_API + "/mod", { headers: authHeader() });
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
