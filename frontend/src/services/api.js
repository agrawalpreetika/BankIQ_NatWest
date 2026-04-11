import axios from "axios";

const API =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/query/";

export const askQuery = async (query) => {
  try {
    const res = await axios.post(API, { query });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};