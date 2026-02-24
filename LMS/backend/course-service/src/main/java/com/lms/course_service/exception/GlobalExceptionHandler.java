package com.lms.course_service.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionBody handleUserAlreadyExists(NotFoundException e) {
        log.error(e.getMessage());
        return new ExceptionBody(e.getMessage());
    }

    @ExceptionHandler(DocumentUploadException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ExceptionBody handleDocumentUpload(DocumentUploadException e) {
        log.error(e.getMessage());
        return new ExceptionBody(e.getMessage());
    }

}