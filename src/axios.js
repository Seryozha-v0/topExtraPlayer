import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4400',
    withCredentials: true
});

export default instance;