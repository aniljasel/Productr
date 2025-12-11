import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await API.get('/auth/profile');
                    setUser(data);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const loginInit = async (email) => {
        await API.post('/auth/login/init', { email });
    };

    const loginVerify = async (email, otp) => {
        const { data } = await API.post('/auth/login/verify', { email, otp });
        localStorage.setItem('token', data.token);
        setUser(data);
        setIsAuthenticated(true);
        return data;
    };

    const signupInit = async (userData) => {
        // userData: { name, email, password }
        await API.post('/auth/signup/init', userData);
    };

    const signupVerify = async (email, otp) => {
        const { data } = await API.post('/auth/signup/verify', { email, otp });
        localStorage.setItem('token', data.token);
        setUser(data);
        setIsAuthenticated(true);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    const updateUser = async (formData) => {
        const { data } = await API.put('/auth/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        localStorage.setItem('token', data.token); // Token might be refreshed or same
        setUser(data);
        return data;
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        loginInit,
        loginVerify,
        signupInit,
        signupVerify,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
