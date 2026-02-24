package com.lms.course_service.mapper;

import com.lms.course_service.dto.CourseDto;
import com.lms.course_service.entity.Course;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface CourseMapper extends BaseMapper<Course, CourseDto> {
}
