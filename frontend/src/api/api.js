import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);

export const createComplaint = (cp) => API.post("/complaints", cp);

export const createUser = (users) => API.post("/user", users);

export const fetchComplaint = () => API.get("/complaints");

export const updateComplaint = (id, updatedCt) =>
  API.patch(`/complaints/${id}`, updatedCt);

export const deleteComplaint = (_id) => API.post(`/complaints/delete/${_id}`);

export const getComplaint = async (_id) => {
  _id = _id || "";
  return await API.get(`/complaints/${_id}`);
};
