import axios from "axios";

const axiosWithBase = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export { axiosWithBase };
