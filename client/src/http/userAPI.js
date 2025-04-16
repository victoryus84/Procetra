import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode"; // Use default export for jwt-decode

export const registration = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
        localStorage.setItem('token', data.token); // Save token to localStorage
        return jwtDecode(data.token); // Decode and return the token
    } catch (error) {
        console.error('Registration error:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/login', { email, password });
        localStorage.setItem('token', data.token); // Save token to localStorage
        return jwtDecode(data.token); // Decode and return the token
    } catch (error) {
        console.error('Login error:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token); // Save token to localStorage
        return jwtDecode(data.token); // Decode and return the token
    } catch (error) {
        console.error('Token validation error:', error.response?.data?.message || error.message);
        throw error;
    }
};
