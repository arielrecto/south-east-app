import { getToken } from "../utils/tokenService";
import axios from "./../utils/axios";

export const getClassrooms = async () => {
  const token = await getToken();

  const { data } = await axios.get("/classrooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const joinClassroom = async (payload) => {
  const token = await getToken();

  const { data } = await axios.post("/classrooms/join", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const classroomShow = async (id) => {
  const token = await getToken();

  const { data } = await axios.get(`/classrooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const announcementShow = async (id) => {
  const token = await getToken();

  const { data } = await axios.get(`/classrooms/announcement/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
