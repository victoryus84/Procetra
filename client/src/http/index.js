import axios from "axios";

// Базовый клиент для публичных запросов
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Клиент для авторизованных запросов
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Интерцептор для добавления токена авторизации
$authHost.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    } else if (process.env.NODE_ENV === 'development') {
        console.warn('No token found in localStorage');
    }
    return config;
});

export { $host, $authHost };