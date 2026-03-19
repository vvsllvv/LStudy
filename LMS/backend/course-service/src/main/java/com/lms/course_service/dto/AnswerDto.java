package com.lms.course_service.dto;

import jakarta.annotation.Nullable;

public record AnswerDto (
        Long id,
        String content,
        Boolean isRight
) {

}
