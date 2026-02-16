package com.lms.user_service.entity.enums;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    ROLE_USER,
    ROLE_MENTOR,
    ROLE_ADMIN;

    @Override
    public @Nullable String getAuthority() {
        return name();
    }
}
