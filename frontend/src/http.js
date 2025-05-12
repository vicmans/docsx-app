import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

console.log(baseURL)

export const httpClient = axios.create({
    baseURL: baseURL || 'http://localhost:3000/api',
    timeout: 1000,
});