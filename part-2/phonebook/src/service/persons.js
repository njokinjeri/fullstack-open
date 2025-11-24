import axios from 'axios';

const baseurl = 'http://localhost:3001/api/persons';

const getAll = () => {
    return axios.get(baseurl).then(response => response.data);
};

const create = newPerson => {
    return axios.post(baseurl, newPerson).then(response => response.data);
};

const remove = (id) => {
    return axios.delete(`${baseurl}/${id}`);
};

const update = (id, updatedPerson) => {
    return axios.put(`${baseurl}/${id}`, updatedPerson).then(response =>response.data);
};

export default { getAll, create, remove, update };