// First we need to import axios.js
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,

});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';



export default instance;