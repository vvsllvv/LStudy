package com.lms.course_service.dto;

import org.springframework.web.multipart.MultipartFile;

public record DocumentDto (
        MultipartFile file
) {

}
