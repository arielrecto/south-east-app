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
