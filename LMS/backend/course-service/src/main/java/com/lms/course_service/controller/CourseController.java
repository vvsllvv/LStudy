package com.lms.course_service.controller;

import com.lms.course_service.controller.base.CustomController;
import com.lms.course_service.dto.CourseDto;
import com.lms.course_service.entity.Course;
import com.lms.course_service.service.CourseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/course/")
public class CourseController extends CustomController<Course, CourseDto> {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
        super(courseService);
    }


}
