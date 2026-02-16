package com.lms.user_service.controller;

import com.lms.user_service.entity.enums.UserRole;
import com.lms.user_service.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @DeleteMapping("/{id}/delete")
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok().body("The user is deleted.");
    }

    @PostMapping("/{id}/rights")
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> rightUser(@PathVariable("id") Long id) {
        adminService.changeRightsUser(id);
        return ResponseEntity.ok().body("User rights are changed.");
    }

    @PostMapping("/{id}/role")
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> changeRoleTo(@PathVariable("id") Long id,
                                          @RequestBody UserRole role) {
        adminService.changeRoleTo(id, role);
        return ResponseEntity.ok().body("User role is changed.");

    }

}
