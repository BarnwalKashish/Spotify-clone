// src/utils/api.js

export const fetchSongData = async () => {
  try {
    const response = await fetch("https://cms.samespace.com/items/songs");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
