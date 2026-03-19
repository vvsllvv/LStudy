// // components/RoleProtectedRoute.js
// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// const RoleProtectedRoute = ({ 
//     children, 
//     allowedRoles = [],
//     requireAll = false
// }) => {
//     const { auth, hasAnyRole, hasAllRoles } = useContext(AuthContext);

//     if (!auth.token) {
//         return <Navigate to="/login" />;
//     }

//     if (allowedRoles.length === 0) {
//         return children;
//     }

//     const hasAccess = requireAll 
//         ? hasAllRoles(allowedRoles)
//         : hasAnyRole(allowedRoles);

//     if (!hasAccess) {
//         return <Navigate to={fallbackPath} />;
//     }

//     return children;
// };

// export default RoleProtectedRoute;