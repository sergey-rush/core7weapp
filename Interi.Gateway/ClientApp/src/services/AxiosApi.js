import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-api-key': process.env.REACT_APP_API_KEY
    }    
});

export default instance;