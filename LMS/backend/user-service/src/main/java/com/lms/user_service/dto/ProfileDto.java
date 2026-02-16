package com.lms.user_service.dto;

import com.lms.user_service.entity.enums.Department;

public record ProfileDto (
    String firstname,
    String lastname,
    Department department
) {

}
