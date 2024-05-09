import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../apiservices/apiService";

const ApiService: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // baseURL: "${API_BASE_URL}",
  // timeout: 10000, // optional timeout
  headers: {
    "Content-Type": "multipart/form-data", // Set default headers if needed
  },
});

export default ApiService;
