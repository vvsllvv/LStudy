package com.lms.course_service.dto;

import com.lms.course_service.entity.enums.Method;

import java.util.List;

public record TestDto (
        Long id,
        String title,
        Method method,
        Boolean active,
        Integer timeout,
        List<QuestionDto> questions
) {

}
