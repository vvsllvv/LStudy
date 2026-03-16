package com.lms.course_service.dto;

import com.lms.course_service.entity.enums.Method;
import jakarta.annotation.Nullable;

import java.util.List;

public record QuestionDto (
        Long id,
        String description,
        Method method,
        List<AnswerDto> answers
) {

}
