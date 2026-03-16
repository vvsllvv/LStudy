package com.lms.user_service.config;

import com.lms.user_service.repository.GroupRepository;
import com.lms.user_service.repository.UserRepository;
import com.lms.user_service.security.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@TestConfiguration
@RequiredArgsConstructor
public class TestConfig {

    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final JwtFilter jwtFilter;

    @Bean
    @Primary
    public BCryptPasswordEncoder testPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
