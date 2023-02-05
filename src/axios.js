import axios from "axios";

export const axiosEvent = axios.create({
  // baseURL: "https://api.yanndevs.com/public/api",
  baseURL: "https://nearhome-api.yanndevs.com",
  headers: {
    "Content-Type": "application/json",
  },
});
