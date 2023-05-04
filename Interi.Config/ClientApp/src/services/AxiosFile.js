import axios from "axios";

const multipart = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }    
});
export default multipart;