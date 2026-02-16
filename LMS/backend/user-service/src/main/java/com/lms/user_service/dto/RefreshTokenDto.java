package com.lms.user_service.dto;

import org.antlr.v4.runtime.misc.NotNull;

public record RefreshTokenDto (
        @NotNull String refreshToken
) {

}
