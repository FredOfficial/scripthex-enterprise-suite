import axios from "axios";

const API_URL = "http://localhost:5001/api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  withCredentials: true,
});

export const getAttendances = async () => {
  const response = await axios.get(`${API_URL}/attendance`, authConfig());
  return response.data;
};

export const timeInEmployee = async (data) => {
  const response = await axios.post(
    `${API_URL}/attendance/time-in`,
    data,
    authConfig(),
  );

  return response.data;
};

export const timeOutAttendance = async (attendanceId) => {
  const response = await axios.put(
    `${API_URL}/attendance/${attendanceId}/time-out`,
    {},
    authConfig(),
  );

  return response.data;
};
