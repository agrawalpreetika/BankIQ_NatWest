import axios from "axios";

const API1=
  process.env.REACT_APP_API_URL1 || "http://127.0.0.1:8000/query/";

const API2 = process.env.REACT_APP_API_URL2 || "http://127.0.0.1:8000/trends";


export const askQuery = async (query) => {
  try {
    const res = await axios.post(API1, { query });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getTrends = async () => {
  const res = await fetch(API2);
  return res.json();
};