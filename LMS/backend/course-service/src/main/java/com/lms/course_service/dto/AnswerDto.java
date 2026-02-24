package com.lms.course_service.dto;

public record AnswerDto (
        Long id,
        String content,
        Boolean isRight
) {

}
