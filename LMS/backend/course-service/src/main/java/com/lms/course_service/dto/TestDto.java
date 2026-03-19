package com.lms.course_service.dto;

import java.util.List;

public record TestDto (
        Long id,
        String title,
        Boolean active,
        Integer timeout,
        List<QuestionDto> questions
) {

}
