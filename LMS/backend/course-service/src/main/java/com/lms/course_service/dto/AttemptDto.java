package com.lms.course_service.dto;

import java.util.List;

public record AttemptDto (
        Long id,
        Integer timeTaken,
        TestDto test,
        Long userId,
        List<Long> answers
){

}
