import axios from "axios";
const clientAxios = axios.create({
  baseURL: process.env.URL,
});

export default clientAxios;
