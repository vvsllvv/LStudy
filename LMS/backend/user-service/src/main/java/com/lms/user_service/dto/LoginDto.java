package com.lms.user_service.dto;

import org.antlr.v4.runtime.misc.NotNull;

public record LoginDto (
        @NotNull String email,
        @NotNull String password
) {

}
