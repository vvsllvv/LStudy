package com.lms.course_service.controller;

import com.lms.course_service.controller.base.CustomController;
import com.lms.course_service.dto.ParagraphDto;
import com.lms.course_service.entity.Paragraph;
import com.lms.course_service.service.ParagraphService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/paragraph/")
public class ParagraphController extends CustomController<Paragraph, ParagraphDto> {

    private ParagraphService paragraphService;

    public ParagraphController(ParagraphService paragraphService) {
        this.paragraphService = paragraphService;
        super(paragraphService);
    }
}
