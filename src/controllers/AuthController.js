import { getToken } from "../utils/tokenService";
import axios from "./../utils/axios";

export const Login = async (payload) => {

  const { data } = await axios.post("/login", payload);

  return data;
};

export const Register = async (payload) => {

  const { data } = await axios.post("/register", payload);

  return data;
};


export const getUser = async () => {

  const token = await getToken();
  console.log(token);

  const {data} = await axios.get('/user',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })


  return data;
}


export const Logout = async () => {

  const token = await getToken();
  console.log(token);

  const {data} = await axios.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })


  return data;
}