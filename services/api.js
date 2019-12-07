import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback'
});

export default api;