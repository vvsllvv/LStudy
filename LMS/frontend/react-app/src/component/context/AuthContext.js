<<<<<<< HEAD
import {createContext, useState, useEffect } from "react";
=======
import { useContext, createContext, useState, userCallback } from "react";
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
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
=======
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1
            {children}
        </AuthContext.Provider>
    )
}   

export default AuthContext;



// export const AuthProvider = ({ children }) => {

//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = (newToken, userData) => {
//     setToken(newToken);
//     setUser(userData);
//     localStorage.setItem('token', newToken);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//     setLoading(false);
//   }, []);

//   const contextValue = {
//     token,
//     user,
//     loading,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {!loading && children} {/* Render children after authentication check */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };