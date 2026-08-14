import api from "./axios";

export const generateRoadmap = async (data) => {
  const response = await api.post("/generate-roadmap", data);
  return response.data;
};

export const getRoadmaps = async () => {
  const response = await api.get("/roadmaps");
  return response.data;
};

export const getRoadmapById = async (id) => {
  const response = await api.get(`/roadmaps/${id}`);
  return response.data;
};