package com.lms.course_service.controller;

import com.lms.course_service.controller.base.CustomController;
import com.lms.course_service.dto.DocumentDto;
import com.lms.course_service.dto.ThemeDto;
import com.lms.course_service.entity.Theme;
import com.lms.course_service.service.DocumentService;
import com.lms.course_service.service.ThemeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/theme/")
public class ThemeController extends CustomController<Theme, ThemeDto> {

    private final ThemeService themeService;
    private final DocumentService documentService;

    public ThemeController(ThemeService themeService, DocumentService documentService) {
        super(themeService);
        this.themeService = themeService;
        this.documentService = documentService;
    }

    @PostMapping("{id}/upload")
    public ResponseEntity<?> upload(@PathVariable("id") Long id, DocumentDto documentDto) {
        documentService.uploadDocument(id, documentDto);
        return ResponseEntity.status(HttpStatus.OK).body("Document uploaded.");
    }

    @GetMapping("/{id}/all")
    public ResponseEntity<?> readAllById(@PathVariable("id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(themeService.readAllById(id));
    }
}
