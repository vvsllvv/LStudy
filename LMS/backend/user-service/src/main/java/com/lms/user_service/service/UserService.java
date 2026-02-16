package com.lms.user_service.service;

import com.lms.user_service.dto.ProfileDto;
import com.lms.user_service.mapper.UserMapper;
import com.lms.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public ProfileDto showProfile() throws AuthenticationException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userMapper.toProfileDto(userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Not valid.")));
    }


}