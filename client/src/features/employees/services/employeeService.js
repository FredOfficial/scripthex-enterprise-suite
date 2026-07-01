import axios from "axios";

const API_URL = "http://localhost:5001/api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  withCredentials: true,
});

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/employees`, authConfig());
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(
    `${API_URL}/employees`,
    employee,
    authConfig(),
  );

  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(
    `${API_URL}/employees/${id}`,
    employee,
    authConfig(),
  );

  return response.data;
};

export const getDepartments = async () => {
  const response = await axios.get(`${API_URL}/departments`, authConfig());
  return response.data;
};

export const getPositions = async () => {
  const response = await axios.get(`${API_URL}/positions`, authConfig());
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(
    `${API_URL}/employees/${id}`,
    authConfig(),
  );

  return response.data;
};
