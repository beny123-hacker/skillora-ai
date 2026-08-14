import api from "./axios";

/**
 * Get YouTube videos based on a topic
 */
export const getVideos = async (topic) => {
  const response = await api.get("/youtube", {
    params: {
      topic,
    },
  });

  return response.data;
};

/**
 * Get recommended videos
 */
export const getRecommendedVideos = async () => {
  const response = await api.get("/youtube/recommended");

  return response.data;
};

/**
 * Search YouTube
 */
export const searchYoutube = async (query) => {
  const response = await api.get("/youtube/search", {
    params: {
      query,
    },
  });

  return response.data;
};