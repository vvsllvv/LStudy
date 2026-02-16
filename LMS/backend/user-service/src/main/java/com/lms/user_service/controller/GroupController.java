package com.lms.user_service.controller;

import com.lms.user_service.dto.GroupDto;
import com.lms.user_service.exception.NotFoundException;
import com.lms.user_service.service.GroupService;
import com.lms.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/group")
@RequiredArgsConstructor
public class GroupController {
    private final UserService userService;
    private final GroupService groupService;

    @GetMapping("/{id}")
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<GroupDto> readGroup(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(groupService.readGroup(id));
    }

    @PostMapping("/{id}/add")
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<GroupDto> addUserToGroup(@PathVariable("id") Long id,
                                                   @RequestBody List<Long> userIds) {
        return ResponseEntity.ok().body(groupService.addUserToGroup(id, userIds));
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello.";
    }
}
