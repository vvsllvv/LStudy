package com.lms.user_service.controller;

import com.lms.user_service.dto.LoginDto;
import com.lms.user_service.dto.RefreshTokenDto;
import com.lms.user_service.dto.RegisterDto;
import com.lms.user_service.dto.ResponseDto;
import com.lms.user_service.exception.UserAlreadyExistsException;
import com.lms.user_service.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/login")
    public ResponseEntity<ResponseDto> signIn(@RequestBody LoginDto loginDto) {
        ResponseDto responseDTO = authService.loginUser(loginDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @GetMapping("/refresh")
    public ResponseEntity<ResponseDto> refreshToken(@RequestBody RefreshTokenDto refreshTokenDTO) throws Exception {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenDTO));
    }

}
