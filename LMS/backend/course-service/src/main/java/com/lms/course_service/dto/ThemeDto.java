package com.lms.course_service.dto;

import java.util.List;

public record ThemeDto(
        Long id,
        String title,
        List<ParagraphDto> paragraphs,
        List<TestDto> tests,
        List<DocumentDto> documents
) {

}

