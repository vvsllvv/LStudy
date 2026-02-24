package com.lms.user_service.service;

import com.lms.user_service.dto.LoginDto;
import com.lms.user_service.dto.RefreshTokenDto;
import com.lms.user_service.dto.RegisterDto;
import com.lms.user_service.dto.ResponseDto;
import com.lms.user_service.entity.User;
import com.lms.user_service.entity.enums.UserRole;
import com.lms.user_service.exception.UserAlreadyExistsException;
import com.lms.user_service.mapper.UserMapper;
import com.lms.user_service.repository.UserRepository;
import com.lms.user_service.security.JwtService;
import com.lms.user_service.security.service.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import javax.naming.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void createUser(RegisterDto registerDto) {
        if (userRepository.findByEmail(registerDto.email()).isPresent())
            throw new UserAlreadyExistsException("User with that email already exists.");

        User user = userMapper.toUserEntity(registerDto);

        user.setPassword(passwordEncoder.encode(registerDto.password()));
        user.setIsEnabled(Boolean.TRUE);
        user.setRole(UserRole.ROLE_USER);

        userRepository.save(user);
        log.info("User is created.");
    }

    public ResponseDto loginUser(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.email()).orElseThrow(
                () -> new UsernameNotFoundException(loginDto.email()));

        if (!passwordEncoder.matches(loginDto.password(), user.getPassword()))
            throw new BadCredentialsException("User password is wrong.");

        if (!user.getIsEnabled())
            throw new DisabledException("User account is disabled.");

        log.info("User {} successfully signed in.", user.getEmail());
        return jwtService.generateAuthToken(user);
    }

    public ResponseDto refreshToken(RefreshTokenDto refreshTokenDto) throws Exception {
        String refreshToken = refreshTokenDto.refreshToken();

        if (refreshToken != null && jwtService.validateJwtToken(refreshToken)) {
            String email = jwtService.getEmailFromToken(refreshToken);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException(email));
            return jwtService.refreshBaseToken(user, refreshToken);
        }
        throw new AuthenticationException("Invalid refresh token");
    }
}

//        Authentication authentication = authenticationManager
//        .authenticate(new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);