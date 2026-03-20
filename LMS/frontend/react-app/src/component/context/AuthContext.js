import {createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: '',
        refreshToken: '',
        role: ''
    });


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedRole = localStorage.getItem('role');
        
        if (storedToken && storedRefreshToken) {
            setAuth({
                token: storedToken,
                refreshToken: storedRefreshToken,
                role: storedRole
            });
        }
    }, []);

    const updateAuth = (newAuth) => {
        setAuth(newAuth);
        if (newAuth.token && newAuth.refreshToken) {
            localStorage.setItem('token', newAuth.token);
            localStorage.setItem('refreshToken', newAuth.refreshToken);
            localStorage.setItem('role', newAuth.role);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');
        }
    };


    const logout = () => {
        setAuth({ token: '', refreshToken: '' });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth: updateAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}   

export default AuthContext;