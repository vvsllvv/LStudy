import React from 'react';

export const ROLES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
    MENTOR: 'ROLE_MENTOR'
};

const useAuth = () => {
    const user = {
        roles: ['ROLE_USER', 'ROLE_MENTOR', 'ROLE_ADMIN']
    };
    
    return {
        user,
        hasRole: (role) => user?.roles?.includes(role),
        hasAnyRole: (roles) => roles.some(role => user?.roles?.includes(role))
    };
};

const RestrictView = ({ children, allowedRoles, userRole }) => {
    if (!userRole) return null;
    
    if (!allowedRoles || allowedRoles.length === 0) {
        return children;
    }

    const hasAccess = allowedRoles.includes(userRole);
    
    return hasAccess ? children : null;
};

export default RestrictView;