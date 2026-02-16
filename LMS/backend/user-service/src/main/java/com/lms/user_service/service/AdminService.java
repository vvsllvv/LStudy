package com.lms.user_service.service;

import com.lms.user_service.entity.User;
import com.lms.user_service.entity.enums.UserRole;
import com.lms.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {
    private final UserRepository userRepository;

    public void deleteUser(Long id) {
        if(!userRepository.existsById(id))
            throw new UsernameNotFoundException("This user doesn't exist.");

        log.info("User {} is enabled.", id);
        userRepository.deleteById(id);
    }

    public void changeRightsUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("This user doesn't exist."));

        if (!user.getIsEnabled()) {
            log.info("User {} is enabled.", user.getId());
            user.setIsEnabled(Boolean.TRUE);
        } else {
            log.info("User {} is disabled.", user.getId());
            user.setIsEnabled(Boolean.FALSE);
        }

        userRepository.save(user);
    }

    public void changeRoleTo(Long id, UserRole role) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("This user doesn't exist."));

        if (user.getRole() == role) {
            log.error("User {} already has role {}", user.getId(), user.getRole());
            throw new RuntimeException();
        }

        user.setRole(role);
        userRepository.save(user);
    }
}

