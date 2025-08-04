import api from "../utils/api";

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};