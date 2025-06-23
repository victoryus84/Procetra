import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { check } from '../http/userAPI';
import { Context } from '../index';

export const useAuthCheck = () => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        check()
            .then(() => {
                user.setUser(true);
                user.setIsAuth(true);
            })
            .catch(() => {
                navigate('/login');
            })
            .finally(() => setLoading(false));
    }, [navigate, user]);

    return loading;
};