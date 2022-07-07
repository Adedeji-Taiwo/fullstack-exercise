import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/login';
//recall to remove http://localhost:3001

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};


const loginService = { login };
export default loginService;