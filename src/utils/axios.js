import axiosLib from "axios";
import { baseURL as BASE_URL } from "./constant";

const axios = axiosLib.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});



export default axios;