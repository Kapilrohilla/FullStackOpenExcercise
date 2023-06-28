// file to communicate with backend
import axios from "axios";

const baseUrl = '/api/persons';

const getAll = () => {
    const promise = axios.get(baseUrl);
    const data = promise.then(r => r.data);
    return data;
}
const create = (newObject) => {
    const promise = axios.post(baseUrl, newObject);
    const data = promise.then(r => r.status)
    return data;
}
const deleteObj = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}
const update = (id, newObject) => {
    const promise = axios.put(`${baseUrl}/${id}`, newObject)
    const data = promise.then(r => r.data)
    return data;
}
const connect = { getAll, create, deleteObj, update }
export default connect;