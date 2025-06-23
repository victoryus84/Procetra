import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Add an interceptor to include the token in the Authorization header
const authInterceptor = config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    } else {
        if (process.env.NODE_ENV === 'development') {
            // Log a warning in development mode if no token is found
            console.warn('No token found in localStorage');
        }
    }
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
};
