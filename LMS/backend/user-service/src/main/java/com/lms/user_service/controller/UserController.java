package com.lms.user_service.controller;

import com.lms.user_service.dto.ProfileDto;
import com.lms.user_service.exception.NotFoundException;
import com.lms.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> showProfile() {
        return ResponseEntity.ok(userService.showProfile());
    }

}
