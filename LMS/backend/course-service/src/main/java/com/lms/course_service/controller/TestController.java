package com.lms.course_service.controller;

import com.lms.course_service.controller.base.CustomController;
import com.lms.course_service.dto.TestDto;
import com.lms.course_service.entity.Test;
import com.lms.course_service.service.TestService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test/")
public class TestController extends CustomController<Test, TestDto> {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
        super(testService);
    }

}
