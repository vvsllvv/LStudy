package com.lms.user_service.dto;

import com.lms.user_service.entity.enums.Department;
import com.lms.user_service.entity.enums.UserRole;

public record ProfileDto (
        Long id,
        String firstname,
        String lastname,
        Department department,
        Boolean isEnabled,
        UserRole role
) {

}
