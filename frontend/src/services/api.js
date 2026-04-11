import axios from "axios";

const API = "http://127.0.0.1:8000/query/";

export const askQuery = async (query) => {
  try {
    const res = await axios.post(API, { query });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};