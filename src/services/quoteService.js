import api from "./axios";

export const getResources = async () => {
  const response = await api.get("/resources");

  return response.data;
};

export const getVideos = async () => {
  const response = await api.get("/resources/videos");

  return response.data;
};

export const getArticles = async () => {
  const response = await api.get("/resources/articles");

  return response.data;
};