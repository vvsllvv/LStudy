package com.lms.course_service.dto;

import java.util.List;

public record ModuleDto (
        Long id,
        String title,
        List<CourseDto> courses
) {

}
