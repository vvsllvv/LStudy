package com.lms.course_service.dto;

import java.util.Date;

public record AttemptDto (
        Long id,
        Integer timeTaken,
        Long testId,
        Long userId
){

}
