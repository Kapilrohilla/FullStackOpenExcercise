import axios from "axios";
const baseUrl = "/api/blogs";

let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
const update = async (idToUpdate, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const urlToUpdate = baseUrl + "/" + idToUpdate;
  const response = await axios.put(urlToUpdate, updatedBlog, config);
  console.log(response.data);
  return response.data;
};
const deleteData = async (idToDelete) => {
  const config = {
    headers: { Authorization: token },
  };
  const urlToDelete = baseUrl + "/" + idToDelete;
  const response = await axios.delete(urlToDelete, config);
  console.log(response.data);
  return response.data;
};
export default { getAll, setToken, create, update, deleteData };
