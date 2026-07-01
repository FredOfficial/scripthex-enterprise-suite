import axios from "axios";

const API_URL = "http://localhost:5001/api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  withCredentials: true,
});

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard`, authConfig());

  return response.data;
};
