package com.lms.course_service.dto;

import java.util.ArrayList;
import java.util.List;

public record AttemptDto (
        Long id,
        Integer timeTaken,
        Long testId,
        Long userId,
        List<Long> answers
){

}
