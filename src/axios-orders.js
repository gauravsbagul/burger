import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-f9f18.firebaseio.com/'
});

export default instance;