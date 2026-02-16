package com.lms.user_service.dto;

import java.util.List;

public record GroupDto (
    Long id,
    List<ProfileDto> users
) {

}
