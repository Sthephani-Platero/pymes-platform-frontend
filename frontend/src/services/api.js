import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/pulsar",
});

export const fetchBrandsProfiles = async () => {
  const res = await api.get("/brands-profiles");
  return res.data;
};

export const fetchEngagements = async () => {
  const res = await api.get("/engagements");
  return res.data;
};

export const fetchComments = async () => {
  const res = await api.get("/comments");
  return res.data;
};

export const getDashboard = (category) => {
  return api.get(`/dashboard?category=${category}`);
};