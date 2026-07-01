import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  });

  return response.data;
};
