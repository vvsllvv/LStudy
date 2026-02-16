package com.lms.user_service.dto;

import com.lms.user_service.entity.enums.Department;
import org.antlr.v4.runtime.misc.NotNull;

public record RegisterDto (
        @NotNull String email,
        @NotNull String password,
        @NotNull String firstname,
        @NotNull String lastname,
        @NotNull Department department
) {

}