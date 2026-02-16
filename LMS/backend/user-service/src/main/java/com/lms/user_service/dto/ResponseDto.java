package com.lms.user_service.dto;

import org.antlr.v4.runtime.misc.NotNull;

public record ResponseDto (
        @NotNull String token,
        @NotNull String refreshToken
) {

}
