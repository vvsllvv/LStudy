package com.lms.course_service.controller;

import com.lms.course_service.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/doc/")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.status((HttpStatus.OK)).body("Document is deleted.");
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<?> download(@PathVariable("id") Long id) {
        String url = documentService.getDocument(id);
        return ResponseEntity.ok(url);
    }

}
