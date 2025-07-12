import axios from "axios";

console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/used-spare-parts`;

export const getAll = () => axios.get(API_URL).then((res) => res.data);
export const getById = (id) =>
  axios.get(`${API_URL}/${id}`).then((res) => res.data);
export const create = (data, token) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios
    .post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
export const update = (id, data, token) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios
    .put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
export const remove = (id, token) =>
  axios
    .delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
