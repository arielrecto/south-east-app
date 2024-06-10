import { getToken } from "../utils/tokenService";
import axios from "./../utils/axios";

export const addAttendance = async (payload) => {
  const token = await getToken();

  const { data } = await axios.post("/classrooms/attendance", payload , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};


export const attendanceIndex = async (id) => {
  const token = await getToken();

  const { data } = await axios.get(`/classrooms/${id}/attendances`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
