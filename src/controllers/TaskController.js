import { getToken } from "../utils/tokenService";
import axios from "./../utils/axios";

export const getTasks = async (id) => {
  const token = await getToken();

  const { data } = await axios.get(`/classrooms/${id}/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getTask = async (id) => {
    const token = await getToken();
  
    const { data } = await axios.get(`/classrooms/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return data;
  };
