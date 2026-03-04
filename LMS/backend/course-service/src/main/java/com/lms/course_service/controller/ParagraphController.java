package com.lms.course_service.controller;

import com.lms.course_service.controller.base.CustomController;
import com.lms.course_service.dto.ParagraphDto;
import com.lms.course_service.entity.Paragraph;
import com.lms.course_service.service.ParagraphService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{id}/all")
    public ResponseEntity<?> readAllById(@PathVariable("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(paragraphService.readAllById(id));
    }
}
