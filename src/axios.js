import axios from "axios";

const instance = axios.create({
    baseURL: 'https://auth-back-six.vercel.app',
    withCredentials: true
});

export default instance;