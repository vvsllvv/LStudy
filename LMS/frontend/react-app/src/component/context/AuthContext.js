import { useContext, createContext, useState, userCallback } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
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