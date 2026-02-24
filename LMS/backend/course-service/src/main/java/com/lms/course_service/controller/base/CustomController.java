package com.lms.course_service.controller.base;

import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.service.base.CustomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public abstract class CustomController <ENTITY, DTO> {

    protected final CustomService<ENTITY, DTO> service;

    protected CustomController(CustomService<ENTITY, DTO> service) {
        this.service = service;
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            service.delete(id);
            return ResponseEntity.ok().body("The object is deleted.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Object wasn't found.");
        }
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody DTO dto) {
        service.create(dto);
    }

    @PostMapping("{id}/create")
    public ResponseEntity<?> create(@PathVariable Long id, @RequestBody DTO dto) {
        try {
            service.create(id, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Object is created.");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.read(id));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong.");
        }
    }

    @PatchMapping("/{id}/update")
    public ResponseEntity<?> read(@PathVariable("id") Long id,
                                  @RequestBody DTO dto) {
        try {
            service.update(id, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body("redirect:/{id}");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong.");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> readAll() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.readAll());
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong.");
        }
    }

}