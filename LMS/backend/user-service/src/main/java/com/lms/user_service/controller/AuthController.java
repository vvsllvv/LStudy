package com.lms.user_service.controller;

import com.lms.user_service.dto.LoginDto;
import com.lms.user_service.dto.RefreshTokenDto;
import com.lms.user_service.dto.RegisterDto;
import com.lms.user_service.dto.ResponseDto;
import com.lms.user_service.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/registration")
    public ResponseEntity<?> createUser(@RequestBody RegisterDto registerDto) {
        authService.createUser(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User is created.");
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto> signIn(@RequestBody LoginDto loginDto) {
        ResponseDto responseDTO = authService.loginUser(loginDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @GetMapping("/refresh")
    public ResponseEntity<ResponseDto> refreshToken(@RequestBody RefreshTokenDto refreshTokenDTO) throws Exception {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenDTO));
    }

    @GetMapping("/validate")
    public String validateToken(@RequestHeader("Authorization") String authHeader) {
        authService.validateToken(authHeader);
        return "Token is valid";
    }

}
